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

interface Archetype {
	/** Human-readable name shown in the narrative title */
	name: string;
	/** Authored narrative body (pre-written, not assembled). All @draft. */
	body: string;
	/**
	 * Predicate over the dominants map. Must return true for the archetype to match.
	 * Each check is: dominants[axisLabel] === direction.
	 * An archetype matches if ALL required conditions hold.
	 */
	requires: Array<{ axis: string; dir: 'high' | 'low' }>;
	/** Number of matching requires entries needed to trigger (default = all) */
	minMatch?: number;
}

/**
 * Pre-authored archetype narratives. Checked in order; first match wins.
 * Fallback: the assembler below.
 * All body strings are @draft — review before shipping.
 */
const ARCHETYPES: Archetype[] = [
	{
		name: 'The Incubating Architect',
		requires: [
			{ axis: 'Structuring orientation', dir: 'high' },
			{ axis: 'Incubation reliance', dir: 'high' },
			{ axis: 'Self-regulation', dir: 'high' },
		],
		body: "You think in models and you think slowly — on purpose. Before writing a line of code, you've already built the system in your head, tested edge cases, and restructured it twice. Methodologies that assume you can estimate immediately or commit to a sprint without adequate incubation time will always feel like they're asking you to work before you're ready. The best working environments for you give you the space to think, then step back and let you build.", // @draft
	},
	{
		name: 'The Flow-State Shipper',
		requires: [
			{ axis: 'Incubation reliance', dir: 'low' },
			{ axis: 'Structuring orientation', dir: 'low' },
			{ axis: 'Peer collaboration', dir: 'low' },
		],
		body: "You get in, you build, you ship. You don't need to see the whole picture before starting — you find the picture by building it. Interruptions are your main enemy: standups, planning ceremonies, and pairing sessions all break the rhythm that lets you do your best work. Methodologies that minimise ceremony and protect flow time — Shape Up, async-first, trunk-based development — are designed for exactly the way you think.", // @draft
	},
	{
		name: 'The Collaborative Structurer',
		requires: [
			{ axis: 'Structuring orientation', dir: 'high' },
			{ axis: 'Peer collaboration', dir: 'high' },
		],
		body: "You think in systems and you do your best thinking out loud. Where solitary architects retreat into their heads, you want the whiteboard and a collaborator. Your designs emerge from conversation — the structure is rigorous, but the process that produces it is social. Pair programming, collaborative DDD modelling, and synchronous code review all suit you because they let you externalise and interrogate the model while it's still forming.", // @draft
	},
	{
		name: 'The Externally-Anchored Executor',
		requires: [
			{ axis: 'Self-regulation', dir: 'low' },
			{ axis: 'Incubation reliance', dir: 'low' },
		],
		body: "You work best when the structure is clear and the feedback is fast. Sprints, standups, and estimation rituals aren't overhead for you — they're the scaffolding that keeps you oriented and moving. Without them, you drift. Scrum, Kanban, and daily standups are methodologies built for your operating model: defined cadences, visible progress, and regular synchronisation points that let you know you're on track.", // @draft
	},
	{
		name: 'The Analytical Solo Worker',
		requires: [
			{ axis: 'Processing mode', dir: 'high' },
			{ axis: 'Peer collaboration', dir: 'low' },
			{ axis: 'Self-regulation', dir: 'high' },
		],
		body: "You decompose problems systematically and you do it alone. You're not antisocial — you just find that other people in the problem-solving loop slow you down rather than accelerating you. Your natural workflow is: understand the problem fully, design the solution internally, implement in a long solo session, then surface for feedback via async code review. TDD, documentation-driven development, and PR-based review fit your loop; pairing and standups don't.", // @draft
	},
	{
		name: 'The Holistic Risk-Averse Planner',
		requires: [
			{ axis: 'Processing mode', dir: 'low' },
			{ axis: 'Structuring orientation', dir: 'high' },
			{ axis: 'Incubation reliance', dir: 'high' },
		],
		body: "You need to see the whole shape before you commit to any part of it. Breaking a problem into sprint-sized pieces before you've mapped the full territory is uncomfortable — you know from experience that premature decomposition produces plans that don't survive contact with the actual system. Shape Up's appetite-setting and DDD's domain modelling appeal to you because they let you think at the system level before descending into implementation.", // @draft
	},
	{
		name: 'The Pragmatic Adaptor',
		requires: [
			{ axis: 'Structuring orientation', dir: 'low' },
			{ axis: 'Self-regulation', dir: 'low' },
			{ axis: 'Peer collaboration', dir: 'high' },
		],
		body: "You're flexible. You pick up whatever methodology the team is running and make it work, because your instinct is to solve the social problem (how does this group ship software together?) rather than the philosophical one (what is the correct way to build software?). This is a genuine strength in teams with mixed styles, but it can mean you lack a strong prior about what 'good' looks like. Building that prior — even a rough one — will help you advocate for your team when it counts.", // @draft
	},
	{
		name: 'The Emergent Experimenter',
		requires: [
			{ axis: 'Structuring orientation', dir: 'low' },
			{ axis: 'Incubation reliance', dir: 'low' },
			{ axis: 'Self-regulation', dir: 'high' },
		],
		body: "You learn by doing, and you don't need anyone to give you the problem. You're at your best when given a vague direction and full autonomy — you'll prototype your way to an answer that no one could have specified upfront. Methodologies that require detailed upfront planning or tight sprint commitments feel like a cage. Shape Up's 'shaped but not specified' model fits you well: appetite without prescription, autonomy without ambiguity.", // @draft
	},
];

/**
 * Attempts to match the dominants map against the archetype table.
 * Returns the first archetype whose conditions are satisfied, or null.
 */
function matchArchetype(dominants: Record<string, 'high' | 'low'>): Archetype | null {
	for (const archetype of ARCHETYPES) {
		const minMatch = archetype.minMatch ?? archetype.requires.length;
		const matchCount = archetype.requires.filter(
			(req) => dominants[req.axis] === req.dir,
		).length;
		if (matchCount >= minMatch) return archetype;
	}
	return null;
}

/**
 * Assembles a narrative from individual axis traits (fallback when no archetype matches).
 * Less precise than an archetype but covers edge cases.
 */
function assembleFallbackNarrative(
	dominants: Record<string, 'high' | 'low'>,
): ProfileInsight | null {
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

	return { type: 'narrative', title: 'Profile shape', body };
}

/**
 * Generates a narrative insight: archetype-matched if possible, assembled as fallback.
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

	// Try archetype match first
	const archetype = matchArchetype(dominants);
	if (archetype) {
		return {
			type: 'narrative',
			title: archetype.name,
			body: archetype.body,
		};
	}

	// Fall back to assembled narrative
	return assembleFallbackNarrative(dominants);
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
