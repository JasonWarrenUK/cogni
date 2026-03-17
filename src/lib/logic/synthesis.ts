import type { CompassDataMap } from '$lib/data/types.js';
import { getDimPositions } from './constraints.js';

export type InsightType = 'clustering' | 'tension' | 'narrative';

export interface ProfileInsight {
	type: InsightType;
	title: string;
	body: string;
	/** Axis labels involved */
	dims?: string[];
	/** Compass accent colours involved (for visual hint) */
	accents?: string[];
}

/**
 * Detects dimension clustering: 3+ compasses agree on the same axis direction.
 * Indicates a strong foundational trait.
 */
function detectClustering(dims: ReturnType<typeof getDimPositions>): ProfileInsight[] {
	const insights: ProfileInsight[] = [];

	for (const [label, positions] of Object.entries(dims)) {
		if (positions.length < 3) continue;

		const dirs = positions.map((p) => p.dir);
		const highCount = dirs.filter((d) => d === 'high').length;
		const lowCount = dirs.filter((d) => d === 'low').length;

		if (highCount >= 3 || lowCount >= 3) {
			const dominant = highCount >= lowCount ? 'high' : 'low';
			const count = dominant === 'high' ? highCount : lowCount;
			const compass = positions.find((p) => p.dir === dominant)!;

			insights.push({
				type: 'clustering',
				title: `Strong signal: ${label}`,
				body: `${count} compasses independently place you on the same side of the "${label}" axis. This is a foundational trait — consistent across multiple perspectives, not an artefact of a single self-assessment.`,
				dims: [label],
				accents: positions.filter((p) => p.dir === dominant).map((p) => p.accent),
			});
		}
	}

	return insights;
}

/**
 * Detects tension: compasses disagree on the same axis.
 * Worth examining — may indicate genuine complexity or context-dependency.
 */
function detectTensions(dims: ReturnType<typeof getDimPositions>): ProfileInsight[] {
	const insights: ProfileInsight[] = [];

	for (const [label, positions] of Object.entries(dims)) {
		if (positions.length < 2) continue;

		const dirs = [...new Set(positions.map((p) => p.dir))];
		if (dirs.length !== 2) continue;

		const highPositions = positions.filter((p) => p.dir === 'high');
		const lowPositions = positions.filter((p) => p.dir === 'low');

		// Only surface if at least one source on each side
		if (highPositions.length === 0 || lowPositions.length === 0) continue;

		const highTitles = highPositions.map((p) => p.cTitle).join(', ');
		const lowTitles = lowPositions.map((p) => p.cTitle).join(', ');

		insights.push({
			type: 'tension',
			title: `Tension on "${label}"`,
			body: `Different compasses pull in opposite directions here. ${highTitles} suggest the high end; ${lowTitles} suggest the low. This may reflect genuine context-sensitivity — you operate differently depending on conditions — or it may indicate an area worth re-examining.`,
			dims: [label],
			accents: positions.map((p) => p.accent),
		});
	}

	return insights;
}

/**
 * Generates a 2-3 sentence narrative characterising the overall profile shape.
 * Reads the dominant patterns across tiers to produce a human-readable shape description.
 */
function buildNarrative(
	dims: ReturnType<typeof getDimPositions>,
	positionedCount: number,
	totalCount: number,
): ProfileInsight | null {
	if (positionedCount < 5) return null; // Not enough data for a meaningful narrative

	// Gather dominant directions per axis
	const dominants: Record<string, 'high' | 'low'> = {};
	for (const [label, positions] of Object.entries(dims)) {
		const highCount = positions.filter((p) => p.dir === 'high').length;
		const lowCount = positions.filter((p) => p.dir === 'low').length;
		if (highCount !== lowCount) {
			dominants[label] = highCount > lowCount ? 'high' : 'low';
		}
	}

	const traits: string[] = [];

	// Structuring orientation
	if (dominants['Structuring orientation'] === 'high') {
		traits.push('proactive structurer — you build the model before the code');
	} else if (dominants['Structuring orientation'] === 'low') {
		traits.push('emergent builder — you discover structure through the work');
	}

	// Incubation reliance
	if (dominants['Incubation reliance'] === 'high') {
		traits.push('high-incubation thinker — you need time for ideas to settle before acting');
	} else if (dominants['Incubation reliance'] === 'low') {
		traits.push('immediate executor — you solve at the keyboard');
	}

	// Self-regulation
	if (dominants['Self-regulation'] === 'high') {
		traits.push('internally regulated — you set your own pace and structure');
	} else if (dominants['Self-regulation'] === 'low') {
		traits.push('externally regulated — you work well within imposed structures');
	}

	// Processing mode
	if (dominants['Processing mode'] === 'high') {
		traits.push('analytical processor — you decompose problems step by step');
	} else if (dominants['Processing mode'] === 'low') {
		traits.push('holistic processor — you need the whole picture before acting');
	}

	// Peer collaboration
	if (dominants['Peer collaboration'] === 'high') {
		traits.push('synchronous collaborator — you do your best work with others in real time');
	} else if (dominants['Peer collaboration'] === 'low') {
		traits.push('asynchronous worker — you prefer deep solo work with async coordination');
	}

	if (traits.length < 2) return null;

	const primary = traits.slice(0, 2);
	const rest = traits.slice(2);

	let body = `Your profile shows a ${primary.join(' and a ')}.`;
	if (rest.length > 0) {
		body += ` You also appear to be a ${rest.join(' and a ')}.`;
	}

	return {
		type: 'narrative',
		title: 'Profile shape',
		body,
	};
}

/**
 * Analyses compass positions to detect cross-compass patterns.
 * Returns ProfileInsight[] — pure function, no side effects.
 */
export function synthesiseProfile(
	compassData: CompassDataMap,
	totalCompasses: number,
): ProfileInsight[] {
	const positioned = Object.values(compassData).filter(
		(d) => d.quadrant !== null && d.quadrant !== undefined,
	).length;

	if (positioned < 3) return [];

	const dims = getDimPositions(compassData);
	const insights: ProfileInsight[] = [];

	const narrative = buildNarrative(dims, positioned, totalCompasses);
	if (narrative) insights.push(narrative);

	insights.push(...detectClustering(dims));
	insights.push(...detectTensions(dims));

	return insights;
}
