import { COMPASSES } from '$lib/data/compasses.js';
import type { CompassData, CompassDataMap } from '$lib/data/types.js';

function createInitialCompassData(): CompassDataMap {
	const data: CompassDataMap = {};
	for (const compass of COMPASSES) {
		data[compass.id] = { quadrant: null, intensity: 0, notes: '' };
	}
	return data;
}

function createProfileStore() {
	let compassData = $state<CompassDataMap>(createInitialCompassData());
	let growth = $state({ developing: '', questions: '' });
	let references = $state('');

	const positionedCount = $derived(
		COMPASSES.filter((c) => compassData[c.id]?.quadrant !== null && compassData[c.id]?.quadrant !== undefined).length,
	);

	function updateCompass(id: string, data: Partial<CompassData>) {
		compassData = { ...compassData, [id]: { ...compassData[id], ...data } };
	}

	function updateGrowth(field: 'developing' | 'questions', value: string) {
		growth = { ...growth, [field]: value };
	}

	function reset() {
		compassData = createInitialCompassData();
		growth = { developing: '', questions: '' };
		references = '';
	}

	return {
		get compassData() { return compassData; },
		get growth() { return growth; },
		get references() { return references; },
		set references(v: string) { references = v; },
		get positionedCount() { return positionedCount; },
		updateCompass,
		updateGrowth,
		reset,
	};
}

export const profile = createProfileStore();
