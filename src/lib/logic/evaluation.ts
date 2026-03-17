import type { Method, CompassDataMap, MethodEvaluation, ScoredAlternative, ConfidenceLevel, ProjectContext } from '$lib/data/types.js';
import { COMPASSES } from '$lib/data/compasses.js';

/** Maps intensity index to scoring weight. */
function intensityWeight(intensity: 0 | 1 | 2): number {
	const weights: Record<number, number> = { 0: 0.5, 1: 1.0, 2: 1.5 };
	return weights[intensity] ?? 1.0;
}

export function evaluateMethod(
	method: Method,
	compassData: CompassDataMap,
	context?: ProjectContext | null,
): MethodEvaluation {
	const evals = [];

	for (const [compassId, evaluator] of Object.entries(method.evaluators)) {
		const data = compassData[compassId];
		if (data?.quadrant === null || data?.quadrant === undefined) continue;

		const quadrantEval = evaluator[data.quadrant];
		if (!quadrantEval) continue;

		const compass = COMPASSES.find((c) => c.id === compassId);
		if (!compass) continue;

		const weight = intensityWeight(data.intensity);

		evals.push({
			compassId,
			compass,
			fit: quadrantEval.fit,
			text: quadrantEval.text,
			quadrant: data.quadrant,
			weight,
		});
	}

	const total = Object.keys(method.evaluators).length;

	if (evals.length === 0) {
		return {
			overall: 'awaiting',
			evals,
			positioned: 0,
			total,
			score: 0,
			confidence: 'low',
		};
	}

	// Weighted scoring: natural=+1, adapt=0, friction=-1, multiplied by intensity weight
	const fitValues: Record<'natural' | 'adapt' | 'friction', number> = {
		natural: 1,
		adapt: 0,
		friction: -1,
	};

	let weightedSum = 0;
	let totalWeight = 0;
	for (const ev of evals) {
		const value = fitValues[ev.fit];
		weightedSum += value * ev.weight;
		totalWeight += ev.weight;
	}

	let score = totalWeight > 0 ? weightedSum / totalWeight : 0;

	// Apply context modifiers if context is provided and the method defines them
	if (context && method.contextModifiers) {
		let contextDelta = 0;
		let contextWeight = 0;

		for (const mod of method.contextModifiers) {
			if (mod.phase && mod.phase !== context.phase) continue;
			if (mod.teamSize && mod.teamSize !== context.teamSize) continue;
			if (compassData[mod.compassId]?.quadrant !== mod.quadrant) continue;

			contextDelta += mod.delta;
			contextWeight += 1;
		}

		if (contextWeight > 0) {
			// Blend context delta into the score (max ±0.3 shift from context)
			const normalised = Math.min(Math.max(contextDelta / contextWeight, -1), 1);
			score = Math.min(Math.max(score + normalised * 0.3, -1), 1);
		}
	}

	// Confidence: based on fraction of evaluators that contributed
	const coverageRatio = evals.length / total;
	const confidence: ConfidenceLevel =
		coverageRatio >= 0.6 ? 'high' : coverageRatio >= 0.35 ? 'medium' : 'low';

	// Tighten thresholds when confidence is low — require stronger signal to call natural/friction
	const threshold = confidence === 'high' ? 0.3 : confidence === 'medium' ? 0.45 : 0.6;

	let overall: 'natural' | 'adapt' | 'friction' = 'adapt';
	if (score > threshold) {
		overall = 'natural';
	} else if (score < -threshold) {
		overall = 'friction';
	}

	return {
		overall,
		evals,
		positioned: evals.length,
		total,
		score,
		confidence,
	};
}

/** Scores an alternative based on how many of its relevant compass positions match the user's. */
export function scoreAlternative(
	relevant: string[],
	compassData: CompassDataMap,
): ScoredAlternative['score'] extends number ? { score: number; matchCount: number; totalRefs: number } : never {
	if (relevant.length === 0) {
		return { score: 0.5, matchCount: 0, totalRefs: 0 };
	}

	const matchCount = relevant.filter((ref) => {
		const lastDash = ref.lastIndexOf('-');
		const compassId = ref.substring(0, lastDash);
		const quadrantIndex = parseInt(ref.substring(lastDash + 1), 10);
		return compassData[compassId]?.quadrant === quadrantIndex;
	}).length;

	const score = matchCount / relevant.length;

	return { score, matchCount, totalRefs: relevant.length };
}

/** @deprecated Use scoreAlternative instead. Kept for backwards compatibility. */
export function isAlternativeRelevant(
	relevant: string[],
	compassData: CompassDataMap,
): boolean {
	if (relevant.length === 0) return true;

	return relevant.some((ref) => {
		const lastDash = ref.lastIndexOf('-');
		const compassId = ref.substring(0, lastDash);
		const quadrantIndex = parseInt(ref.substring(lastDash + 1), 10);
		return compassData[compassId]?.quadrant === quadrantIndex;
	});
}
