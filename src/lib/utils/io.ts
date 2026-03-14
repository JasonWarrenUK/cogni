import { COMPASSES } from '$lib/data/compasses.js';
import type { CompassDataMap, ProfileExport } from '$lib/data/types.js';

const INTENSITY_LABELS = ['centre', 'moderate', 'strong'] as const;
const VERSION = '0.3';

export function exportProfile(
	compassData: CompassDataMap,
	growth: { developing: string; questions: string },
	references: string,
): void {
	const payload: ProfileExport = {
		exportedAt: new Date().toISOString(),
		version: VERSION,
		compasses: {},
		growth,
		references,
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

export function importProfile(
	file: File,
	onSuccess: (
		compassData: Partial<CompassDataMap>,
		growth: { developing: string; questions: string },
		references: string,
	) => void,
	onError?: (err: unknown) => void,
): void {
	const reader = new FileReader();
	reader.onload = (event) => {
		try {
			const payload = JSON.parse(event.target?.result as string) as ProfileExport;
			const compassData: Partial<CompassDataMap> = {};

			if (payload.compasses) {
				for (const [id, saved] of Object.entries(payload.compasses)) {
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
			);
		} catch (err) {
			onError?.(err);
			console.error('Import failed:', err);
		}
	};
	reader.readAsText(file);
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
