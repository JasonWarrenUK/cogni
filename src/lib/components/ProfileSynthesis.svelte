<script lang="ts">
	import type { CompassDataMap } from '$lib/data/types.js';
	import { COMPASSES } from '$lib/data/compasses.js';
	import { synthesiseProfile } from '$lib/logic/synthesis.js';
	import TogglePanel from './TogglePanel.svelte';

	interface Props {
		compassData: CompassDataMap;
	}

	let { compassData }: Props = $props();

	let insights = $derived(synthesiseProfile(compassData, COMPASSES.length));
</script>

{#if insights.length > 0}
	<TogglePanel label="Profile patterns">
		<div class="insights">
			{#each insights as insight}
				<div class="insight" class:narrative={insight.type === 'narrative'} class:tension={insight.type === 'tension'} class:clustering={insight.type === 'clustering'}>
					<div class="insight-header">
						<span class="insight-icon">
							{#if insight.type === 'narrative'}◈{:else if insight.type === 'clustering'}●{:else}◐{/if}
						</span>
						<span class="insight-title">{insight.title}</span>
					</div>
					<p class="insight-body">{insight.body}</p>
					{#if insight.accents && insight.accents.length > 0}
						<div class="insight-accents">
							{#each insight.accents as accent}
								<span class="accent-dot" style:background={accent} style:box-shadow="0 0 4px {accent}66"></span>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</TogglePanel>
{/if}

<style>
	.insights {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.insight {
		padding: 14px 16px;
		border-radius: var(--radius-sm);
		border-left: 2px solid var(--border);
		background: var(--surface);
	}

	.insight.narrative {
		border-left-color: rgba(255, 255, 255, 0.2);
		background: var(--surface-raised);
	}

	.insight.clustering {
		border-left-color: rgba(74, 222, 128, 0.3);
	}

	.insight.tension {
		border-left-color: rgba(251, 191, 36, 0.3);
	}

	.insight-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
	}

	.insight-icon {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-faint);
	}

	.insight.clustering .insight-icon {
		color: var(--fit-natural);
	}

	.insight.tension .insight-icon {
		color: var(--fit-adapt);
	}

	.insight.narrative .insight-icon {
		color: var(--accent-meta);
	}

	.insight-title {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--text-muted);
	}

	.insight.narrative .insight-title {
		color: #c4b5fd;
	}

	.insight-body {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0;
	}

	.insight-accents {
		display: flex;
		gap: 5px;
		margin-top: 8px;
	}

	.accent-dot {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
	}
</style>
