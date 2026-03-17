<script lang="ts">
	import type { CompassDataMap, ProjectContext } from '$lib/data/types.js';
	import { ESTABLISHED_METHODS } from '$lib/data/methods.js';
	import { PRACTICE_STACKS } from '$lib/data/practice-stacks.js';
	import { getTopStacks } from '$lib/logic/stacks.js';
	import { FIT_META } from '$lib/data/fit-meta.js';
	import TogglePanel from './TogglePanel.svelte';

	interface Props {
		compassData: CompassDataMap;
		context?: ProjectContext | null;
	}

	let { compassData, context = null }: Props = $props();

	let topStacks = $derived(getTopStacks(PRACTICE_STACKS, ESTABLISHED_METHODS, compassData, 2, context));
</script>

{#if topStacks.length > 0}
	<TogglePanel label="Practice stack recommendations">
		<p class="stacks-intro">Real teams adopt combinations, not individual methods. These stacks fit your profile as a whole.</p>

		<div class="stack-list">
			{#each topStacks as { stack, score, confidence, evaluatedCount, methodEvaluations }}
				<div class="stack">
					<div class="stack-header">
						<div class="stack-name">{stack.name}</div>
						<div class="stack-tagline">{stack.tagline}</div>
					</div>

					<p class="stack-desc">{stack.desc}</p>

					<div class="stack-methods">
						{#each stack.methods as methodId, i}
							{@const ev = methodEvaluations[i]}
							{@const meta = ev && ev.overall !== 'awaiting' ? FIT_META[ev.overall] : null}
							<span
								class="method-chip"
								style:border-color={meta ? meta.border : 'var(--border)'}
								style:color={meta ? meta.color : 'var(--text-faint)'}
							>
								{ESTABLISHED_METHODS.find((m) => m.id === methodId)?.name ?? methodId}
							</span>
						{/each}
					</div>

					{#if confidence !== 'high'}
						<div class="stack-confidence">
							Based on {evaluatedCount}/{stack.methods.length} methods evaluated
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</TogglePanel>
{/if}

<style>
	.stacks-intro {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-faint);
		line-height: 1.6;
		margin: 0 0 20px;
	}

	.stack-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.stack {
		padding: 16px 20px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
	}

	.stack-header {
		margin-bottom: 8px;
	}

	.stack-name {
		font-family: var(--serif);
		font-size: 16px;
		color: #e0e0e0;
		margin-bottom: 2px;
	}

	.stack-tagline {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.stack-desc {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0 0 12px;
	}

	.stack-methods {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.method-chip {
		font-family: var(--mono);
		font-size: 10px;
		padding: 3px 10px;
		border-radius: var(--radius-md);
		border: 1px solid;
		background: transparent;
	}

	.stack-confidence {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--text-faint);
		margin-top: 8px;
		letter-spacing: 0.5px;
	}
</style>
