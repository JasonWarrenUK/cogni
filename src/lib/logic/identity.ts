import type { CompassDataMap } from '$lib/data/types.js';
import { COMPASSES } from '$lib/data/compasses.js';
import { getDimPositions, quadToAxes } from './constraints.js';

export interface IdentityNarrative {
	sentences: string[];
}

export interface FoundationLink {
	axis: string;
	tier3Compass: { id: string; title: string; accent: string; dir: 'high' | 'low'; dirLabel: string };
	tier12Compass: { id: string; title: string; accent: string; dir: 'high' | 'low'; dirLabel: string };
	explanation: string;
	agreement: boolean;
}

export interface CognitiveIdentity {
	narrative: IdentityNarrative;
	foundationLinks: FoundationLink[];
}

/** Per-quadrant trait fragments for each tier-3 compass.
 *  Index matches quadrant layout: [0=ax1-high/ax2-high, 1=ax1-high/ax2-low, 2=ax1-low/ax2-high, 3=ax1-low/ax2-low]
 */
const TRAIT_FRAGMENTS: Record<string, Record<number, string>> = {
	'learning-style': {
		0: 'builds thorough mental models through observation before acting',
		1: 'develops abstract frameworks and stress-tests them by building',
		2: 'reflects on real code and concrete behaviour to form understanding',
		3: 'learns primarily by doing — changes things and sees what happens',
	},
	'problem-engagement': {
		0: 'approaches problems systematically through study and structured analysis',
		1: 'designs experiments, analyses results, and iterates methodically',
		2: 'absorbs the whole picture through contemplation before moving',
		3: 'grasps problems by jumping in and discovering through action',
	},
	'problem-processing': {
		0: 'works through problems step by step in real time at the keyboard',
		1: 'decomposes analytically first, then incubates before executing',
		2: 'grasps the overall shape intuitively and builds immediately',
		3: 'absorbs the whole problem and lets it cook before committing',
	},
	'creative-workflow': {
		0: 'loads the problem, lets it incubate, then builds the right thing from the start',
		1: 'marinates on a problem and discovers structure organically through building',
		2: 'plans carefully and executes directly at the keyboard — a steady producer',
		3: 'starts building immediately, finding the fastest path from problem to solution',
	},
};

/** Cross-compass interaction sentences for notable tier-3 combinations. */
const CROSS_FRAGMENTS: Array<{
	compasses: [string, string];
	quadrants: [number, number];
	sentence: string;
}> = [
	{
		compasses: ['learning-style', 'problem-engagement'],
		quadrants: [0, 0],
		sentence: 'The combination of theoretical model-building and systematic study produces a deeply reflective, framework-first cognitive style.',
	},
	{
		compasses: ['learning-style', 'problem-engagement'],
		quadrants: [3, 3],
		sentence: 'Learning by doing and grasping through action reinforce each other — a fully hands-on, discovery-driven style.',
	},
	{
		compasses: ['learning-style', 'problem-processing'],
		quadrants: [0, 1],
		sentence: 'Building mental models and analytical incubation together suggest a patient, thorough approach to understanding before committing.',
	},
	{
		compasses: ['learning-style', 'problem-processing'],
		quadrants: [3, 2],
		sentence: 'Concrete experimentation and intuitive immediate-building reinforce each other — responsive, action-first thinking.',
	},
	{
		compasses: ['problem-processing', 'creative-workflow'],
		quadrants: [3, 1],
		sentence: 'Incubating holistically and letting structure emerge organically through building is a signature of reflective-emergent creative work.',
	},
	{
		compasses: ['problem-processing', 'creative-workflow'],
		quadrants: [0, 3],
		sentence: 'Solving step-by-step in real time and building immediately for the fastest path is a high-throughput, keyboard-native style.',
	},
	{
		compasses: ['problem-engagement', 'creative-workflow'],
		quadrants: [1, 2],
		sentence: 'Scientific experimentation and careful upfront planning suggest someone who runs controlled, deliberate builds.',
	},
	{
		compasses: ['learning-style', 'creative-workflow'],
		quadrants: [1, 0],
		sentence: 'Testing abstract models through practice and incubating before building combines deep theory with disciplined execution.',
	},
];

const INTENSITY_PREFIXES: Record<0 | 1 | 2, string> = {
	0: 'Notably,',
	1: 'Notably,',
	2: 'Strongly,',
};

/**
 * Composes a 2-4 sentence cognitive identity narrative from tier-3 compass positions.
 * Requires at least 2 tier-3 compasses to be positioned.
 */
export function synthesiseCognitiveIdentity(compassData: CompassDataMap): CognitiveIdentity | null {
	const tier3Compasses = COMPASSES.filter((c) => c.tier === 3);

	// Collect positioned tier-3 compasses
	const positioned = tier3Compasses
		.map((c) => {
			const data = compassData[c.id];
			if (data?.quadrant === null || data?.quadrant === undefined) return null;
			return { compass: c, data };
		})
		.filter((x): x is NonNullable<typeof x> => x !== null);

	if (positioned.length < 2) return null;

	// Build per-compass trait sentences
	const traitSentences: string[] = [];
	for (const { compass, data } of positioned) {
		const fragments = TRAIT_FRAGMENTS[compass.id];
		if (!fragments) continue;
		const fragment = fragments[data.quadrant!];
		if (!fragment) continue;
		const prefix = INTENSITY_PREFIXES[data.intensity as 0 | 1 | 2] ?? 'Notably,';
		const sentence = data.intensity === 2
			? `${prefix} you ${fragment}.`
			: `You tend to ${fragment}.`;
		traitSentences.push(sentence);
	}

	// Find cross-compass interaction sentences
	const crossSentences: string[] = [];
	for (const cross of CROSS_FRAGMENTS) {
		const [idA, idB] = cross.compasses;
		const [qA, qB] = cross.quadrants;
		const posA = positioned.find((p) => p.compass.id === idA);
		const posB = positioned.find((p) => p.compass.id === idB);
		if (posA?.data.quadrant === qA && posB?.data.quadrant === qB) {
			crossSentences.push(cross.sentence);
		}
	}

	// Combine: up to 2 trait sentences + up to 2 cross sentences = max 4
	const sentences = [
		...traitSentences.slice(0, 2),
		...crossSentences.slice(0, 2),
	];

	// Build foundation links: where tier-3 axes overlap with tier 1/2 axes
	const foundationLinks = buildFoundationLinks(compassData, positioned);

	return {
		narrative: { sentences },
		foundationLinks,
	};
}

function buildFoundationLinks(
	compassData: CompassDataMap,
	positionedTier3: Array<{ compass: (typeof COMPASSES)[0]; data: { quadrant: number | null; intensity: 0 | 1 | 2; notes: string } }>,
): FoundationLink[] {
	const links: FoundationLink[] = [];
	const tier12Compasses = COMPASSES.filter((c) => c.tier <= 2);

	for (const { compass: t3, data: t3data } of positionedTier3) {
		if (t3data.quadrant === null || t3data.quadrant === undefined) continue;
		const t3axes = quadToAxes(t3data.quadrant);

		for (const axKey of ['ax1', 'ax2'] as const) {
			const axLabel = t3[axKey].label;
			const t3dir = t3axes[axKey];

			// Find tier 1/2 compasses that share this axis label and are positioned
			for (const t12 of tier12Compasses) {
				let t12axKey: 'ax1' | 'ax2' | null = null;
				if (t12.ax1.label === axLabel) t12axKey = 'ax1';
				else if (t12.ax2.label === axLabel) t12axKey = 'ax2';
				if (!t12axKey) continue;

				const t12data = compassData[t12.id];
				if (t12data?.quadrant === null || t12data?.quadrant === undefined) continue;

				const t12axes = quadToAxes(t12data.quadrant);
				const t12dir = t12axes[t12axKey];

				const agreement = t3dir === t12dir;
				const t3dirLabel = t3dir === 'high' ? t3[axKey].high : t3[axKey].low;
				const t12dirLabel = t12dir === 'high' ? t12[t12axKey].high : t12[t12axKey].low;

				const explanation = agreement
					? `Both compasses independently establish ${axLabel} as "${t3dirLabel}" — a consistently reinforced trait.`
					: `${t3.title} suggests "${t3dirLabel}" on ${axLabel}, while ${t12.title} suggests "${t12dirLabel}" — these pull in opposite directions, which may indicate context-dependency.`;

				links.push({
					axis: axLabel,
					tier3Compass: {
						id: t3.id,
						title: t3.title,
						accent: t3.accent,
						dir: t3dir,
						dirLabel: t3dirLabel,
					},
					tier12Compass: {
						id: t12.id,
						title: t12.title,
						accent: t12.accent,
						dir: t12dir,
						dirLabel: t12dirLabel,
					},
					explanation,
					agreement,
				});
			}
		}
	}

	// Deduplicate: same axis + same compass pair regardless of which is tier-3
	const seen = new Set<string>();
	return links.filter((link) => {
		const key = [link.axis, link.tier3Compass.id, link.tier12Compass.id].sort().join('|');
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
