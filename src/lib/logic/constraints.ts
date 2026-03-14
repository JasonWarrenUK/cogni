import type { Compass, CompassDataMap, Constraints } from '$lib/data/types.js';
import { COMPASSES } from '$lib/data/compasses.js';

/** Maps a quadrant index to its axis directions. Layout: [0=high/high, 1=high/low, 2=low/high, 3=low/low] */
export function quadToAxes(quadrant: number): { ax1: 'high' | 'low'; ax2: 'high' | 'low' } {
	return {
		ax1: quadrant <= 1 ? 'high' : 'low',
		ax2: quadrant % 2 === 0 ? 'high' : 'low',
	};
}

interface DimPosition {
	cId: string;
	cTitle: string;
	dir: 'high' | 'low';
	accent: string;
}

/** Collects established axis positions from all positioned compasses. */
export function getDimPositions(compassData: CompassDataMap): Record<string, DimPosition[]> {
	const dims: Record<string, DimPosition[]> = {};

	for (const compass of COMPASSES) {
		const data = compassData[compass.id];
		if (data.quadrant === null || data.quadrant === undefined) continue;

		const axes = quadToAxes(data.quadrant);

		for (const [key, dir] of [['ax1', axes.ax1], ['ax2', axes.ax2]] as const) {
			const label = compass[key].label;
			if (!dims[label]) dims[label] = [];
			dims[label].push({ cId: compass.id, cTitle: compass.title, dir, accent: compass.accent });
		}
	}

	return dims;
}

/** Returns which quadrants are in conflict with existing compass positions, and why. */
export function getConstraints(compass: Compass, compassData: CompassDataMap): Constraints {
	const dims = getDimPositions(compassData);
	const result: Constraints = {
		conflicts: [false, false, false, false],
		reasons: [],
	};

	for (const key of ['ax1', 'ax2'] as const) {
		const label = compass[key].label;
		const others = (dims[label] ?? []).filter((p) => p.cId !== compass.id);
		if (!others.length) continue;

		const dirs = [...new Set(others.map((o) => o.dir))];
		if (dirs.length !== 1) continue; // conflicting sources — no constraint

		const establishedDir = dirs[0];
		const source = others[0];

		if (key === 'ax1') {
			if (establishedDir === 'high') {
				result.conflicts[2] = true;
				result.conflicts[3] = true;
			} else {
				result.conflicts[0] = true;
				result.conflicts[1] = true;
			}
		} else {
			if (establishedDir === 'high') {
				result.conflicts[1] = true;
				result.conflicts[3] = true;
			} else {
				result.conflicts[0] = true;
				result.conflicts[2] = true;
			}
		}

		result.reasons.push({
			dim: label,
			est: establishedDir === 'high' ? compass[key].high : compass[key].low,
			from: source.cTitle,
			accent: source.accent,
		});
	}

	return result;
}
