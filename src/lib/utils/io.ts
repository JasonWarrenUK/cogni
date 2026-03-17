import { COMPASSES } from '$lib/data/compasses.js';
import { ESTABLISHED_METHODS } from '$lib/data/methods.js';
import { PRACTICE_STACKS } from '$lib/data/practice-stacks.js';
import { evaluateMethod } from '$lib/logic/evaluation.js';
import { synthesiseProfile } from '$lib/logic/synthesis.js';
import { getTopStacks } from '$lib/logic/stacks.js';
import { FIT_META } from '$lib/data/fit-meta.js';
import type { CompassDataMap, ProfileExport, UserReference, ProjectContext } from '$lib/data/types.js';

const INTENSITY_LABELS = ['centre', 'moderate', 'strong'] as const;
export const VERSION = '0.6';

/** Migration pipeline — currently empty as only v0.3/v0.4 exists. */
const MIGRATIONS: Array<{ from: string; to: string; migrate: (d: unknown) => unknown }> = [];

function migratePayload(payload: unknown): ProfileExport {
	let current = payload as ProfileExport;

	for (const migration of MIGRATIONS) {
		if (current.version === migration.from) {
			current = migration.migrate(current) as ProfileExport;
		}
	}

	return current;
}

const KNOWN_VERSIONS = new Set(['0.3', '0.4', '0.5', '0.6']);
const KNOWN_IDS = new Set(COMPASSES.map((c) => c.id));

export function exportProfile(
	compassData: CompassDataMap,
	growth: { developing: string; questions: string },
	references: string,
	structuredReferences?: UserReference[],
): void {
	const payload: ProfileExport = {
		exportedAt: new Date().toISOString(),
		version: VERSION,
		compasses: {},
		growth,
		references,
		structuredReferences: structuredReferences ?? [],
	};

	for (const compass of COMPASSES) {
		const data = compassData[compass.id];
		if (data.quadrant === null || data.quadrant === undefined) continue;

		payload.compasses[compass.id] = {
			title: compass.title,
			tier: compass.tier,
			quadrant: compass.quads[data.quadrant].label,
			intensity: INTENSITY_LABELS[data.intensity],
			notes: data.notes,
		};
	}

	const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = 'developer-cognition-profile.json';
	anchor.click();
	URL.revokeObjectURL(url);
}

/** Generates a human-readable Markdown document of the profile. */
export function exportProfileMarkdown(
	compassData: CompassDataMap,
	growth: { developing: string; questions: string },
	structuredReferences: UserReference[],
	context?: ProjectContext | null,
): void {
	const lines: string[] = [];
	const now = new Date();
	const dateStr = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

	lines.push(`# Developer Cognition Profile`);
	lines.push(`*Exported ${dateStr} · Cogni v${VERSION}*`);
	lines.push('');

	// Context
	if (context?.phase || context?.teamSize) {
		const parts = [];
		if (context.phase) parts.push(`**Phase:** ${context.phase}`);
		if (context.teamSize) parts.push(`**Team:** ${context.teamSize}`);
		lines.push(`> ${parts.join(' · ')}`);
		lines.push('');
	}

	// Section 1: Compass Positions
	lines.push('## Compass Positions');
	lines.push('');

	const tier1 = COMPASSES.filter((c) => c.tier === 1);
	const tier2 = COMPASSES.filter((c) => c.tier === 2);
	const tier3 = COMPASSES.filter((c) => c.tier === 3);

	for (const [tierLabel, tierCompasses] of [['Tier 1', tier1], ['Tier 2', tier2], ['Tier 3', tier3]] as const) {
		lines.push(`### ${tierLabel}`);
		lines.push('');
		for (const compass of tierCompasses) {
			const data = compassData[compass.id];
			if (!data || data.quadrant === null || data.quadrant === undefined) continue;
			const quad = compass.quads[data.quadrant];
			const intensity = INTENSITY_LABELS[data.intensity];
			lines.push(`**${compass.title}** — ${quad.label} *(${intensity})*`);
			lines.push(`*${quad.desc}*`);
			if (data.notes) lines.push(`> ${data.notes}`);
			lines.push('');
		}
	}

	// Section 2: Profile Synthesis
	const insights = synthesiseProfile(compassData, COMPASSES.length);
	if (insights.length > 0) {
		lines.push('## Profile Patterns');
		lines.push('');
		for (const insight of insights) {
			lines.push(`### ${insight.title}`);
			lines.push(insight.body);
			lines.push('');
		}
	}

	// Section 3: Methodology Fit
	lines.push('## Methodology Fit');
	lines.push('');

	for (const method of ESTABLISHED_METHODS) {
		const result = evaluateMethod(method, compassData, context);
		if (result.overall === 'awaiting') continue;

		const meta = FIT_META[result.overall];
		lines.push(`### ${method.name}`);
		lines.push(`**Overall fit:** ${meta.label} · ${result.positioned}/${result.total} compasses · confidence: ${result.confidence}`);
		lines.push('');

		if (result.evals.length > 0) {
			for (const ev of result.evals) {
				const evMeta = FIT_META[ev.fit];
				lines.push(`**${ev.compass.title}** — ${evMeta.label}`);
				lines.push(ev.text);
				lines.push('');
			}
		}
	}

	// Section 4: Practice Stack Recommendations
	const topStacks = getTopStacks(PRACTICE_STACKS, ESTABLISHED_METHODS, compassData, 2, context);
	if (topStacks.length > 0) {
		lines.push('## Recommended Practice Stacks');
		lines.push('');
		for (const { stack, score } of topStacks) {
			lines.push(`### ${stack.name}`);
			lines.push(`*${stack.tagline}*`);
			lines.push('');
			lines.push(stack.desc);
			lines.push('');
			lines.push(`**Methods:** ${stack.methods.map((id) => ESTABLISHED_METHODS.find((m) => m.id === id)?.name ?? id).join(' + ')}`);
			lines.push('');
		}
	}

	// Section 5: Growth Edges
	if (growth.developing || growth.questions) {
		lines.push('## Growth Edges');
		lines.push('');
		if (growth.developing) {
			lines.push('### Currently developing');
			lines.push(growth.developing);
			lines.push('');
		}
		if (growth.questions) {
			lines.push('### Open questions');
			lines.push(growth.questions);
			lines.push('');
		}
	}

	// Section 6: References
	if (structuredReferences.length > 0) {
		lines.push('## References');
		lines.push('');
		for (const ref of structuredReferences) {
			const year = ref.year ? ` (${ref.year})` : '';
			lines.push(`- **${ref.author}** — *${ref.work}*${year}. ${ref.note}`);
		}
		lines.push('');
	}

	// All methodology sources
	const allSources = ESTABLISHED_METHODS.flatMap((m) => m.sources);
	const uniqueSources = allSources.filter(
		(s, i, arr) => arr.findIndex((x) => x.author === s.author && x.work === s.work) === i,
	);
	if (uniqueSources.length > 0) {
		lines.push('## Methodology Sources');
		lines.push('');
		for (const src of uniqueSources) {
			lines.push(`- **${src.author}** — *${src.work}* (${src.year}). ${src.note}`);
		}
		lines.push('');
	}

	lines.push('---');
	lines.push('*Generated by Cogni — Developer Cognition Profile*');

	const content = lines.join('\n');
	const blob = new Blob([content], { type: 'text/markdown' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = 'developer-cognition-profile.md';
	anchor.click();
	URL.revokeObjectURL(url);
}

export function importProfile(
	file: File,
	onSuccess: (
		compassData: Partial<CompassDataMap>,
		growth: { developing: string; questions: string },
		references: string,
		structuredReferences: UserReference[],
	) => void,
	onError?: (err: unknown) => void,
): void {
	file.text().then((text) => {
		try {
			const raw = JSON.parse(text);

			// Version validation
			const version = (raw as Record<string, unknown>).version;
			if (version && !KNOWN_VERSIONS.has(version as string)) {
				throw new Error(`Unknown profile version "${version}". Expected one of: ${[...KNOWN_VERSIONS].join(', ')}`);
			}

			const payload = migratePayload(raw);
			const compassData: Partial<CompassDataMap> = {};

			if (payload.compasses) {
				for (const [id, saved] of Object.entries(payload.compasses)) {
					// Validate compass ID exists
					if (!KNOWN_IDS.has(id)) {
						console.warn(`Skipping unknown compass ID "${id}" during import`);
						continue;
					}

					const compass = COMPASSES.find((c) => c.id === id);
					if (!compass) continue;

					const quadrantIndex = compass.quads.findIndex((q) => q.label === saved.quadrant);
					const intensityIndex = INTENSITY_LABELS.indexOf(saved.intensity as typeof INTENSITY_LABELS[number]);

					compassData[id] = {
						quadrant: quadrantIndex >= 0 ? quadrantIndex : null,
						intensity: (intensityIndex >= 0 ? intensityIndex : 0) as 0 | 1 | 2,
						notes: saved.notes ?? '',
					};
				}
			}

			onSuccess(
				compassData,
				payload.growth ?? { developing: '', questions: '' },
				payload.references ?? '',
				payload.structuredReferences ?? [],
			);
		} catch (err) {
			onError?.(err);
			console.error('Import failed:', err);
		}
	}).catch((err) => {
		onError?.(err);
		console.error('Import failed:', err);
	});
}

export function triggerFileInput(onFile: (file: File) => void): void {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';
	input.onchange = (event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) onFile(file);
	};
	input.click();
}
