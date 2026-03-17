import type { Method, CompassDataMap, MethodEvaluation, ProjectContext } from '$lib/data/types.js';
import type { PracticeStack } from '$lib/data/practice-stacks.js';
import { evaluateMethod } from './evaluation.js';

export interface ScoredStack {
	stack: PracticeStack;
	score: number;
	/** Average confidence across constituent methods */
	confidence: 'high' | 'medium' | 'low';
	/** Number of methods that contributed (were not 'awaiting') */
	evaluatedCount: number;
	methodEvaluations: MethodEvaluation[];
}

/**
 * Scores each stack by averaging its constituent method fit scores.
 * Returns stacks sorted by score, descending.
 * Only returns stacks where at least 2 methods are evaluated.
 */
export function scoreStacks(
	stacks: PracticeStack[],
	methods: Method[],
	compassData: CompassDataMap,
	context?: ProjectContext | null,
): ScoredStack[] {
	const methodMap = Object.fromEntries(methods.map((m) => [m.id, m]));

	return stacks
		.map((stack): ScoredStack | null => {
			const evals: MethodEvaluation[] = [];

			for (const methodId of stack.methods) {
				const method = methodMap[methodId];
				if (!method) continue;
				evals.push(evaluateMethod(method, compassData, context));
			}

			const evaluated = evals.filter((e) => e.overall !== 'awaiting');
			if (evaluated.length < 2) return null;

			const avgScore = evaluated.reduce((sum, e) => sum + e.score, 0) / evaluated.length;

			const confidenceCounts = { high: 0, medium: 0, low: 0 };
			for (const e of evaluated) confidenceCounts[e.confidence]++;
			const dominantConf: 'high' | 'medium' | 'low' = confidenceCounts.high >= evaluated.length / 2
				? 'high'
				: confidenceCounts.medium >= evaluated.length / 2
					? 'medium'
					: 'low';

			return {
				stack,
				score: avgScore,
				confidence: dominantConf,
				evaluatedCount: evaluated.length,
				methodEvaluations: evals,
			};
		})
		.filter((s): s is ScoredStack => s !== null)
		.sort((a, b) => b.score - a.score);
}

/** Returns the top N fitting stacks. */
export function getTopStacks(
	stacks: PracticeStack[],
	methods: Method[],
	compassData: CompassDataMap,
	n: number = 2,
	context?: ProjectContext | null,
): ScoredStack[] {
	return scoreStacks(stacks, methods, compassData, context)
		.filter((s) => s.score > -0.2) // exclude clearly bad fits
		.slice(0, n);
}
