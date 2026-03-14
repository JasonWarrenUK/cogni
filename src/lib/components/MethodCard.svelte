<script lang="ts">
	import type { Method, CompassDataMap } from '$lib/data/types.js';
	import { COMPASSES } from '$lib/data/compasses.js';
	import { evaluateMethod, isAlternativeRelevant } from '$lib/logic/evaluation.js';
	import { FIT_META } from '$lib/data/fit-meta.js';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		method: Method;
		compassData: CompassDataMap;
	}

	let { method, compassData }: Props = $props();

	let expanded = $state(false);

	let result = $derived(evaluateMethod(method, compassData));
	let meta = $derived(FIT_META[result.overall]);
	let hasData = $derived(result.overall !== 'awaiting');

	let relevantAlternatives = $derived(
		method.alternatives.filter((alt) => isAlternativeRelevant(alt.relevant, compassData)),
	);

	let awaitingCompassTitles = $derived(
		Object.keys(method.evaluators)
			.map((id) => COMPASSES.find((c) => c.id === id)?.title ?? id)
			.join(', '),
	);
</script>

<FadeIn from="left">
	<div class="card" class:expanded>
		<button class="card-header" onclick={() => (expanded = !expanded)}>
			<div
				class="indicator"
				style:background={meta.color}
				style:box-shadow={hasData ? `0 0 12px ${meta.color}44` : 'none'}
			></div>

			<div class="header-text">
				<div class="title" style:color={expanded ? meta.color : '#f0f0f0'}>
					{method.name}
				</div>
				<div class="brief">{method.brief}</div>
			</div>

			<span
				class="fit-badge"
				style:background={meta.bg}
				style:color={meta.color}
				style:border="1px solid {meta.border}"
			>
				{meta.label}
			</span>

			<div class="toggle" class:rotated={expanded}>+</div>
		</button>

		{#if expanded}
			<div class="card-body">
				{#if !hasData}
					<p class="awaiting-text">
						Position the relevant compasses in Part 1 to see your relationship to this methodology.
						Relevant compasses: {awaitingCompassTitles}.
					</p>
				{:else}
					<div class="positioned-count">
						{result.positioned} / {result.total} relevant compasses positioned
					</div>

					<div class="evaluations">
						{#each result.evals as ev}
							<div class="eval" style:border-left-color={ev.compass.accent}>
								<div class="eval-header">
									<span style:color={ev.compass.accent}>{ev.compass.title}</span>
									{' — '}
									<span style:color={FIT_META[ev.fit].color}>{FIT_META[ev.fit].label}</span>
								</div>
								<div class="eval-text">{ev.text}</div>
							</div>
						{/each}
					</div>

					{#if relevantAlternatives.length > 0}
						<div class="alternatives">
							<div class="section-label">Alternatives that fit your profile</div>
							<div class="alt-list">
								{#each relevantAlternatives as alt}
									<div class="alt-item">
										<div class="alt-name">{alt.name}</div>
										<div class="alt-desc">{alt.desc}</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/if}

				<div class="sources">
					<div class="section-label">Supporting voices</div>
					<div class="source-list">
						{#each method.sources as src}
							<div class="source">
								<span class="source-author">{src.author}</span>
								{' — '}
								<span class="source-work">{src.work}</span>
								{' ('}
								{src.year}
								{'). '}
								{src.note}
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</FadeIn>

<style>
	.card {
		background: transparent;
		border-radius: 16px;
		transition: background 0.4s ease;
		margin-bottom: 8px;
	}

	.card.expanded {
		background: rgba(255, 255, 255, 0.015);
	}

	.card-header {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px 24px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		outline: none;
	}

	.indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}

	.header-text {
		flex: 1;
	}

	.title {
		font-family: var(--serif);
		font-size: clamp(18px, 2.5vw, 24px);
		transition: color 0.3s ease;
	}

	.brief {
		font-family: var(--mono);
		font-size: 11px;
		color: #777;
		margin-top: 2px;
	}

	.fit-badge {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 2px;
		padding: 3px 10px;
		border-radius: 8px;
		white-space: nowrap;
	}

	.toggle {
		color: #777;
		font-size: 18px;
		transition: transform 0.3s ease;
	}

	.toggle.rotated {
		transform: rotate(45deg);
	}

	.card-body {
		padding: 0 24px 24px;
		animation: fadeIn 0.4s ease;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.awaiting-text {
		font-family: var(--mono);
		font-size: 12px;
		color: #666;
		font-style: italic;
		line-height: 1.7;
		margin: 0;
	}

	.positioned-count {
		font-family: var(--mono);
		font-size: 11px;
		color: #777;
	}

	.evaluations {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.eval {
		border-left: 2px solid;
		padding-left: 14px;
	}

	.eval-header {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 4px;
	}

	.eval-text {
		font-family: var(--mono);
		font-size: 12px;
		color: #bbb;
		line-height: 1.7;
	}

	.section-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: #999;
		margin-bottom: 12px;
	}

	.alt-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.alt-item {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		padding: 12px 16px;
	}

	.alt-name {
		font-family: var(--mono);
		font-size: 12px;
		color: #ddd;
		margin-bottom: 4px;
	}

	.alt-desc {
		font-family: var(--mono);
		font-size: 11px;
		color: #999;
		line-height: 1.6;
	}

	.source-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.source {
		font-family: var(--mono);
		font-size: 11px;
		color: #888;
		line-height: 1.6;
	}

	.source-author {
		color: #bbb;
	}

	.source-work {
		font-style: italic;
	}
</style>
