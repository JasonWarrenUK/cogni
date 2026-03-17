import type { Compass, CompassDataMap, Constraints } from '$lib/data/types.js';
import { COMPASSES } from '$lib/data/compasses.js';

/** Axis labels that appear on 2+ compasses — only these can be meaningfully corroborated. */
function buildCorroboratableAxes(): Set<string> {
	const counts: Record<string, number> = {};
	for (const c of COMPASSES) {
		counts[c.ax1.label] = (counts[c.ax1.label] ?? 0) + 1;
		counts[c.ax2.label] = (counts[c.ax2.label] ?? 0) + 1;
	}
	return new Set(Object.entries(counts).filter(([, n]) => n >= 2).map(([label]) => label));
}
const CORROBORATABLE_AXES = buildCorroboratableAxes();

export type NetworkInsightType = 'hub' | 'consistent' | 'weak';

export interface NetworkInsight {
	type: NetworkInsightType;
	dim: string;
	/** Number of compasses contributing to this dimension */
	count: number;
	body: string;
}

export interface NetworkAxis {
	label: string;
	direction: 'high' | 'low';
	directionLabel: string;
	compasses: Array<{
		id: string;
		title: string;
		accent: string;
		tier: 1 | 2 | 3;
	}>;
}

/** Returns shared axes with 2+ compasses positioned on them, for the constraint network view. */
export function getConstraintNetwork(compassData: CompassDataMap): NetworkAxis[] {
	const dims = getDimPositions(compassData);
	const result: NetworkAxis[] = [];

	for (const [label, positions] of Object.entries(dims)) {
		if (positions.length < 2) continue;

		// Group by direction — show the dominant or most common direction
		const dirs = [...new Set(positions.map((p) => p.dir))];
		const direction = dirs.length === 1 ? dirs[0] : ('high' as const); // default to high if mixed

		// Find the compass that uses this axis label to get the direction label text
		const compassForAxis = COMPASSES.find(
			(c) => c.ax1.label === label || c.ax2.label === label,
		);
		const axisKey = compassForAxis?.ax1.label === label ? 'ax1' : 'ax2';
		const directionLabel = compassForAxis
			? compassForAxis[axisKey][direction]
			: direction;

		result.push({
			label,
			direction,
			directionLabel,
			compasses: positions.map((p) => {
				const compass = COMPASSES.find((c) => c.id === p.cId)!;
				return { id: p.cId, title: p.cTitle, accent: p.accent, tier: compass.tier };
			}),
		});
	}

	return result;
}

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
		if (!data || data.quadrant === null || data.quadrant === undefined) continue;

		const axes = quadToAxes(data.quadrant);

		for (const [key, dir] of [['ax1', axes.ax1], ['ax2', axes.ax2]] as const) {
			const label = compass[key].label;
			if (!dims[label]) dims[label] = [];
			dims[label].push({ cId: compass.id, cTitle: compass.title, dir, accent: compass.accent });
		}
	}

	return dims;
}

/**
 * Interprets the constraint network: hub dimensions, consistency signals, coverage gaps.
 * Returns insights for display alongside the constraint network visualisation.
 */
export function getNetworkInsights(compassData: CompassDataMap): NetworkInsight[] {
	const dims = getDimPositions(compassData);
	const insights: NetworkInsight[] = [];

	for (const [label, positions] of Object.entries(dims)) {
		const count = positions.length;

		if (count >= 3) {
			// Hub dimension — one axis connects 3+ compasses
			const dirs = [...new Set(positions.map((p) => p.dir))];
			const allAgree = dirs.length === 1;
			if (allAgree) {
				insights.push({
					type: 'hub',
					dim: label,
					count,
					body: `"${label}" is a foundational axis — ${count} compasses position you on the same side. Constraints here propagate widely across your profile.`,
				});
			}
		} else if (count === 2) {
			// Check consistency or weakness
			const dirs = [...new Set(positions.map((p) => p.dir))];
			if (dirs.length === 1) {
				insights.push({
					type: 'consistent',
					dim: label,
					count,
					body: `Both compasses touching "${label}" agree on your direction — consistent signal, reliably established.`,
				});
			}
			// Disagreement is handled by the tension detection in synthesis.ts
		} else if (count === 1 && CORROBORATABLE_AXES.has(label)) {
			insights.push({
				type: 'weak',
				dim: label,
				count,
				body: `"${label}" is established by only one compass so far. Position another compass that shares this axis to corroborate it.`,
			});
		}
	}

	return insights;
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
