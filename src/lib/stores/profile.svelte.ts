import { COMPASSES } from '$lib/data/compasses.js';
import type { CompassData, CompassDataMap, UserReference, ProjectContext } from '$lib/data/types.js';

const STORAGE_KEY = 'cogni-profile';
const VERSION = '0.6';

function createInitialCompassData(): CompassDataMap {
	const data: CompassDataMap = {};
	for (const compass of COMPASSES) {
		data[compass.id] = { quadrant: null, intensity: 0, notes: '' };
	}
	return data;
}

/**
 * problem-processing quad indices were reordered to match the quadToAxes convention.
 * Old: [0=Analytical+Low, 1=Analytical+High, 2=Holistic+Low, 3=Holistic+High]
 * New: [0=Analytical+High, 1=Analytical+Low, 2=Holistic+High, 3=Holistic+Low]
 * Swap: 0↔1 and 2↔3.
 */
const PROBLEM_PROCESSING_REMAP: Record<number, number> = { 0: 1, 1: 0, 2: 3, 3: 2 };

function migrateCompassData(compassData: CompassDataMap, storedVersion: string): CompassDataMap {
	// Migration only needed for profiles saved before version 0.6
	if (storedVersion >= '0.6') return compassData;
	const pp = compassData['problem-processing'];
	if (!pp || pp.quadrant === null || pp.quadrant === undefined) return compassData;
	const remapped = PROBLEM_PROCESSING_REMAP[pp.quadrant];
	if (remapped === undefined) return compassData;
	return { ...compassData, 'problem-processing': { ...pp, quadrant: remapped } };
}

function loadFromStorage(): {
	compassData: CompassDataMap;
	growth: { developing: string; questions: string };
	references: string;
	structuredReferences: UserReference[];
	projectContext: ProjectContext;
} | null {
	if (typeof localStorage === 'undefined') return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		const mergedCompassData = { ...createInitialCompassData(), ...(parsed.compassData ?? {}) };
		return {
			compassData: migrateCompassData(mergedCompassData, parsed.version ?? '0.5'),
			growth: parsed.growth ?? { developing: '', questions: '' },
			references: parsed.references ?? '',
			structuredReferences: parsed.structuredReferences ?? [],
			// Migration: old profiles won't have projectContext
			projectContext: parsed.projectContext ?? { phase: null, teamSize: null },
		};
	} catch {
		return null;
	}
}

function createProfileStore() {
	const saved = loadFromStorage();

	let compassData = $state<CompassDataMap>(saved?.compassData ?? createInitialCompassData());
	let growth = $state(saved?.growth ?? { developing: '', questions: '' });
	let references = $state(saved?.references ?? '');
	let structuredReferences = $state<UserReference[]>(saved?.structuredReferences ?? []);
	let projectContext = $state<ProjectContext>(saved?.projectContext ?? { phase: null, teamSize: null });
	let saveStatus = $state<'saved' | 'unsaved'>('saved');

	let saveTimer: ReturnType<typeof setTimeout> | null = null;

	function scheduleSave() {
		saveStatus = 'unsaved';
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, JSON.stringify({
					version: VERSION,
					compassData,
					growth,
					references,
					structuredReferences,
					projectContext,
				}));
			}
			saveStatus = 'saved';
		}, 300);
	}

	const positionedCount = $derived(
		COMPASSES.filter((c) => compassData[c.id]?.quadrant !== null && compassData[c.id]?.quadrant !== undefined).length,
	);

	function updateCompass(id: string, data: Partial<CompassData>) {
		compassData = { ...compassData, [id]: { ...compassData[id], ...data } };
		scheduleSave();
	}

	function updateGrowth(field: 'developing' | 'questions', value: string) {
		growth = { ...growth, [field]: value };
		scheduleSave();
	}

	function addReference(ref: UserReference) {
		structuredReferences = [...structuredReferences, ref];
		scheduleSave();
	}

	function removeReference(index: number) {
		structuredReferences = structuredReferences.filter((_, i) => i !== index);
		scheduleSave();
	}

	function updateProjectContext(ctx: Partial<ProjectContext>) {
		projectContext = { ...projectContext, ...ctx };
		scheduleSave();
	}

	function reset() {
		compassData = createInitialCompassData();
		growth = { developing: '', questions: '' };
		references = '';
		structuredReferences = [];
		projectContext = { phase: null, teamSize: null };
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem(STORAGE_KEY);
		}
		saveStatus = 'saved';
	}

	return {
		get compassData() { return compassData; },
		get growth() { return growth; },
		get references() { return references; },
		set references(v: string) {
			references = v;
			scheduleSave();
		},
		get structuredReferences() { return structuredReferences; },
		get projectContext() { return projectContext; },
		get positionedCount() { return positionedCount; },
		get saveStatus() { return saveStatus; },
		updateCompass,
		updateGrowth,
		addReference,
		removeReference,
		updateProjectContext,
		reset,
	};
}

export const profile = createProfileStore();
