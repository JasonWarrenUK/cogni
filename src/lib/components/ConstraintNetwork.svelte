<script lang="ts">
	import type { CompassDataMap } from '$lib/data/types.js';
	import { getConstraintNetwork, getNetworkInsights } from '$lib/logic/constraints.js';
	import TogglePanel from './TogglePanel.svelte';

	interface Props {
		compassData: CompassDataMap;
	}

	let { compassData }: Props = $props();

	let network = $derived(getConstraintNetwork(compassData));
	let insights = $derived(getNetworkInsights(compassData));

	// Only show insights that add value (hubs and weak signals; skip 'consistent' to reduce noise)
	let visibleInsights = $derived(insights.filter((i) => i.type !== 'consistent'));
</script>

{#if network.length >= 1}
	<TogglePanel label="Constraint network">
		<div class="axes">
			{#each network as axis}
				<div class="axis-row">
					<div class="axis-meta">
						<span class="axis-dim">{axis.label}</span>
						<span class="axis-arrow">→</span>
						<span class="axis-dir">{axis.directionLabel}</span>
					</div>
					<div class="axis-compasses">
						{#each axis.compasses as compass}
							<span
								class="compass-dot"
								title={compass.title}
								style:background={compass.accent}
								style:box-shadow="0 0 6px {compass.accent}44"
							>
								<span class="compass-label">{compass.title}</span>
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		{#if visibleInsights.length > 0}
			<div class="insights">
				{#each visibleInsights as insight}
					<div class="insight" class:hub={insight.type === 'hub'} class:weak={insight.type === 'weak'}>
						<span class="insight-icon">{insight.type === 'hub' ? '◉' : '○'}</span>
						<span class="insight-body">{insight.body}</span>
					</div>
				{/each}
			</div>
		{/if}
	</TogglePanel>
{/if}

<style>
	.axes {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.axis-row {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.axis-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		min-width: 200px;
	}

	.axis-dim {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.axis-arrow {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
	}

	.axis-dir {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-secondary);
	}

	.axis-compasses {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.compass-dot {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 2px 8px 2px 6px;
		border-radius: 12px;
		font-family: var(--mono);
		font-size: 9px;
		cursor: default;
	}

	.compass-dot::before {
		content: '';
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
	}

	.compass-label {
		color: rgba(255, 255, 255, 0.6);
		font-size: 9px;
		letter-spacing: 0.5px;
	}

	.insights {
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.insight {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.insight-icon {
		font-family: var(--mono);
		font-size: 9px;
		flex-shrink: 0;
		color: var(--text-faint);
	}

	.insight.hub .insight-icon {
		color: var(--accent-meta);
	}

	.insight-body {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
		line-height: 1.6;
	}

	.insight.hub .insight-body {
		color: var(--text-dim);
	}

	@media (max-width: 640px) {
		.axis-meta {
			min-width: unset;
		}
	}
</style>
