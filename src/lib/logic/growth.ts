import type { Method, CompassDataMap, GrowthPath } from '$lib/data/types.js';

export interface ResolvedGrowthPath extends GrowthPath {
	compassId: string;
	compassTitle: string;
	/** Intensity of the driving compass (0=low, 1=normal, 2=strong). Paths from intensity-2 compasses sort first. */
	intensity: 0 | 1 | 2;
}

/**
 * Returns growth paths relevant to the user's current profile.
 * Only paths where the user has friction on the matching quadrant are surfaced.
 * Paths driven by intensity-2 compasses sort first.
 */
export function getRelevantGrowthPaths(
	method: Method,
	compassData: CompassDataMap,
): ResolvedGrowthPath[] {
	if (!method.growthPaths) return [];

	const results: ResolvedGrowthPath[] = [];

	for (const [compassId, paths] of Object.entries(method.growthPaths)) {
		const data = compassData[compassId];
		if (data?.quadrant === null || data?.quadrant === undefined) continue;

		const matchingPath = paths.find((p) => p.quadrant === data.quadrant);
		if (!matchingPath) continue;

		// Only show if the user's evaluator result for this compass is friction
		const evaluator = method.evaluators[compassId];
		if (!evaluator) continue;
		const quadEval = evaluator[data.quadrant];
		if (!quadEval || quadEval.fit !== 'friction') continue;

		results.push({
			...matchingPath,
			compassId,
			compassTitle: compassId, // placeholder — resolved in component
			intensity: data.intensity,
		});
	}

	// Strong-signal (intensity 2) paths surface first
	return results.sort((a, b) => b.intensity - a.intensity);
}
