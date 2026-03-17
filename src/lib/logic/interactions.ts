import type { CompassDataMap, MethodEvaluation, ResolvedInteraction } from '$lib/data/types.js';
import { METHOD_INTERACTIONS } from '$lib/data/method-interactions.js';

/**
 * Returns relevant interactions for the set of methods that have been evaluated.
 * Only shows interactions where:
 * 1. Both methods are evaluated (not 'awaiting')
 * 2. The condition (if any) matches the user's compass position
 */
export function getActiveInteractions(
	evaluations: Record<string, MethodEvaluation>,
	methodNames: Record<string, string>,
	compassData: CompassDataMap,
): ResolvedInteraction[] {
	const results: ResolvedInteraction[] = [];

	for (const interaction of METHOD_INTERACTIONS) {
		const [idA, idB] = interaction.methods;

		// Both methods must be evaluated
		const evalA = evaluations[idA];
		const evalB = evaluations[idB];
		if (!evalA || evalA.overall === 'awaiting') continue;
		if (!evalB || evalB.overall === 'awaiting') continue;

		// Check condition if present
		if (interaction.condition) {
			const lastDash = interaction.condition.lastIndexOf('-');
			const compassId = interaction.condition.substring(0, lastDash);
			const quadrant = parseInt(interaction.condition.substring(lastDash + 1), 10);
			if (compassData[compassId]?.quadrant !== quadrant) continue;
		}

		results.push({
			type: interaction.type,
			text: interaction.text,
			methodNames: [
				methodNames[idA] ?? idA,
				methodNames[idB] ?? idB,
			],
		});
	}

	return results;
}
