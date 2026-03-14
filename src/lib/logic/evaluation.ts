import type { Method, CompassDataMap, MethodEvaluation } from '$lib/data/types.js';
import { COMPASSES } from '$lib/data/compasses.js';

export function evaluateMethod(method: Method, compassData: CompassDataMap): MethodEvaluation {
	const evals = [];

	for (const [compassId, evaluator] of Object.entries(method.evaluators)) {
		const data = compassData[compassId];
		if (data?.quadrant === null || data?.quadrant === undefined) continue;

		const quadrantEval = evaluator[data.quadrant];
		if (!quadrantEval) continue;

		const compass = COMPASSES.find((c) => c.id === compassId);
		if (!compass) continue;

		evals.push({
			compassId,
			compass,
			fit: quadrantEval.fit,
			text: quadrantEval.text,
			quadrant: data.quadrant,
		});
	}

	if (evals.length === 0) {
		return {
			overall: 'awaiting',
			evals,
			positioned: 0,
			total: Object.keys(method.evaluators).length,
		};
	}

	const counts = { natural: 0, adapt: 0, friction: 0 };
	for (const ev of evals) counts[ev.fit]++;

	let overall: 'natural' | 'adapt' | 'friction' = 'adapt';
	if (counts.friction > counts.natural) {
		overall = 'friction';
	} else if (counts.natural > counts.friction && counts.friction === 0) {
		overall = 'natural';
	}

	return {
		overall,
		evals,
		positioned: evals.length,
		total: Object.keys(method.evaluators).length,
	};
}

/** Checks whether an alternative is relevant given the current compass positions. */
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
