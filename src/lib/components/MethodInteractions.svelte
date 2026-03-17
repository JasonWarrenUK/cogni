<script lang="ts">
	import type { CompassDataMap, MethodEvaluation, ResolvedInteraction } from '$lib/data/types.js';
	import { getActiveInteractions } from '$lib/logic/interactions.js';
	import TogglePanel from './TogglePanel.svelte';

	interface Props {
		evaluations: Record<string, MethodEvaluation>;
		methodNames: Record<string, string>;
		compassData: CompassDataMap;
	}

	let { evaluations, methodNames, compassData }: Props = $props();

	let interactions = $derived(getActiveInteractions(evaluations, methodNames, compassData));

	const TYPE_META = {
		synergy: { icon: '⊕', label: 'synergy', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.25)' },
		tension: { icon: '⊗', label: 'tension', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.25)' },
		redundancy: { icon: '≡', label: 'redundancy', color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.25)' },
	};
</script>

{#if interactions.length > 0}
	<TogglePanel label="Method combination effects">
		<div class="interaction-list">
			{#each interactions as interaction}
				{@const meta = TYPE_META[interaction.type]}
				<div class="interaction" style:border-left-color={meta.borderColor}>
					<div class="interaction-header">
						<span class="interaction-icon" style:color={meta.color}>{meta.icon}</span>
						<span class="method-pair">
							{interaction.methodNames[0]}
							<span class="plus"> + </span>
							{interaction.methodNames[1]}
						</span>
						<span class="type-badge" style:color={meta.color}>
							{meta.label}
						</span>
					</div>
					<p class="interaction-text">{interaction.text}</p>
				</div>
			{/each}
		</div>
	</TogglePanel>
{/if}

<style>
	.interaction-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.interaction {
		border-left: 2px solid var(--border);
		padding: 12px 16px;
		background: var(--surface);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.interaction-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
		flex-wrap: wrap;
	}

	.interaction-icon {
		font-family: var(--mono);
		font-size: 13px;
		flex-shrink: 0;
	}

	.method-pair {
		font-family: var(--mono);
		font-size: 11px;
		color: #ccc;
		flex: 1;
	}

	.plus {
		color: var(--text-faint);
		margin: 0 2px;
	}

	.type-badge {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		flex-shrink: 0;
	}

	.interaction-text {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}
</style>
