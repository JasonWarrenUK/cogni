<script lang="ts">
	import type { Method, CompassDataMap, ScoredAlternative, ProjectContext, MethodEvaluation, ResolvedInteraction } from '$lib/data/types.js';
	import { COMPASSES } from '$lib/data/compasses.js';
	import { evaluateMethod, scoreAlternative } from '$lib/logic/evaluation.js';
	import { getRelevantGrowthPaths } from '$lib/logic/growth.js';
	import { getActiveInteractions } from '$lib/logic/interactions.js';
	import { FIT_META } from '$lib/data/fit-meta.js';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		method: Method;
		compassData: CompassDataMap;
		context?: ProjectContext | null;
		/** All method evaluations (pre-computed in +page.svelte). Used for interaction display. */
		evaluations?: Record<string, MethodEvaluation>;
		/** Method id → name map. Used for interaction display. */
		methodNames?: Record<string, string>;
	}

	let { method, compassData, context = null, evaluations = {}, methodNames = {} }: Props = $props();

	let expanded = $state(false);

	let result = $derived(evaluateMethod(method, compassData, context));
	let meta = $derived(FIT_META[result.overall]);
	let hasData = $derived(result.overall !== 'awaiting');

	// Score bar: map score (-1..+1) to a percentage (0..100%)
	let scoreBarPosition = $derived(Math.round(((result.score + 1) / 2) * 100));

	let scoredAlternatives = $derived(
		method.alternatives
			.map((alt): ScoredAlternative => {
				const { score, matchCount, totalRefs } = scoreAlternative(alt.relevant, compassData);
				return { ...alt, score, matchCount, totalRefs };
			})
			.filter((alt) => alt.score > 0)
			.sort((a, b) => {
				// Boost alternatives whose highest-weighted matching compass is at intensity 2
				const maxIntensity = (relevant: string[]): number =>
					relevant.reduce((max, ref) => {
						const lastDash = ref.lastIndexOf('-');
						const id = ref.substring(0, lastDash);
						const intensity: number = compassData[id]?.intensity ?? 0;
						return Math.max(max, intensity);
					}, 0);
				const intensityA = maxIntensity(a.relevant);
				const intensityB = maxIntensity(b.relevant);
				if (intensityB !== intensityA) return intensityB - intensityA;
				return b.score - a.score;
			}),
	);

	let awaitingCompassTitles = $derived(
		Object.keys(method.evaluators)
			.map((id) => COMPASSES.find((c) => c.id === id)?.title ?? id)
			.join(', '),
	);

	let growthPaths = $derived(getRelevantGrowthPaths(method, compassData));
	let resolvedGrowthPaths = $derived(
		growthPaths.map((path) => ({
			...path,
			compassTitle: COMPASSES.find((c) => c.id === path.compassId)?.title ?? path.compassId,
		})),
	);

	// Interactions relevant to this specific method (filtered from global interactions)
	let methodInteractions = $derived<ResolvedInteraction[]>(
		Object.keys(evaluations).length > 0
			? getActiveInteractions(evaluations, methodNames, compassData).filter(
					(i) => i.methodNames[0] === method.name || i.methodNames[1] === method.name,
				)
			: [],
	);
	const INTERACTION_ICON: Record<string, string> = { synergy: '⊕', tension: '⊗', redundancy: '≈' };
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
				<div class="title" style:color={expanded ? meta.color : 'var(--text)'}>
					{method.name}
				</div>
				<div class="brief">{method.brief}</div>

				{#if hasData}
					<!-- Score bar -->
					<div class="score-bar" title="Weighted fit score">
						<div class="score-track">
							<div class="score-marker" style:left="{scoreBarPosition}%"></div>
						</div>
						{#if result.confidence !== 'high'}
							<span class="confidence-label" class:medium={result.confidence === 'medium'} title="{result.positioned} of {result.total} relevant compasses positioned">
								{result.confidence === 'low' ? 'low confidence' : 'partial data'} · {result.positioned}/{result.total}
							</span>
						{/if}
					</div>
				{/if}
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
									{#if ev.weight !== 1.0}
										<span class="weight-label">
											{ev.weight > 1 ? 'strong signal' : 'light signal'}
										</span>
									{/if}
								</div>
								<div class="eval-text">{ev.text}</div>
							</div>
						{/each}
					</div>

					{#if scoredAlternatives.length > 0}
						<div class="alternatives">
							<div class="section-label">Alternatives that fit your profile</div>
							<div class="alt-list">
								{#each scoredAlternatives as alt}
									<div class="alt-item">
										<div class="alt-header">
											<div class="alt-name">{alt.name}</div>
											{#if alt.totalRefs > 0}
												<span class="match-label" class:strong={alt.score >= 0.7}>
													{alt.score >= 0.7 ? 'Strong match' : 'Partial match'}
												</span>
											{/if}
										</div>
										<div class="alt-desc">{alt.desc}</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/if}

				{#if resolvedGrowthPaths.length > 0}
					<div class="growth-paths">
						<div class="section-label">Entry points for your profile</div>
						<div class="path-list">
							{#each resolvedGrowthPaths as path}
								<div class="path-item">
									<div class="path-header">
										<span class="path-icon">→</span>
										<span class="path-bridge">{path.bridge}</span>
										<span class="path-from">via {path.compassTitle}</span>
									</div>
									<p class="path-rationale">{path.rationale}</p>
									<ol class="path-steps">
										{#each path.steps as step}
											<li>{step}</li>
										{/each}
									</ol>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				{#if methodInteractions.length > 0}
					<div class="interactions">
						<div class="section-label">Combines with</div>
						<div class="interaction-list">
							{#each methodInteractions as interaction}
								{@const other = interaction.methodNames[0] === method.name ? interaction.methodNames[1] : interaction.methodNames[0]}
								<div class="interaction-item" class:synergy={interaction.type === 'synergy'} class:tension={interaction.type === 'tension'} class:redundancy={interaction.type === 'redundancy'}>
									<div class="interaction-header">
										<span class="interaction-icon">{INTERACTION_ICON[interaction.type]}</span>
										<span class="interaction-other">{other}</span>
										<span class="interaction-type-label">{interaction.type}</span>
									</div>
									<p class="interaction-text">{interaction.text}</p>
								</div>
							{/each}
						</div>
					</div>
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
		border-radius: var(--radius-lg);
		transition: background 0.4s ease;
		margin-bottom: 8px;
	}

	.card.expanded {
		background: var(--surface);
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
		border-radius: var(--radius-lg);
		transition: background 0.2s ease;
	}

	.card-header:hover {
		background: var(--surface);
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
		color: var(--text-dim);
		margin-top: 2px;
	}

	.score-bar {
		margin-top: 6px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.confidence-label {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--fit-friction);
		letter-spacing: 0.5px;
		opacity: 0.8;
		white-space: nowrap;
	}

	.confidence-label.medium {
		color: var(--fit-adapt);
	}

	.score-track {
		position: relative;
		height: 2px;
		width: 100%;
		max-width: 200px;
		background: linear-gradient(
			to right,
			var(--fit-friction) 0%,
			var(--fit-friction) 20%,
			var(--fit-adapt) 40%,
			var(--fit-adapt) 60%,
			var(--fit-natural) 80%,
			var(--fit-natural) 100%
		);
		border-radius: 2px;
		opacity: 0.5;
	}

	.score-marker {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 5px;
		height: 5px;
		background: var(--text);
		border-radius: 50%;
		transition: left 0.4s ease;
	}

	.fit-badge {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 2px;
		padding: 3px 10px;
		border-radius: var(--radius-sm);
		white-space: nowrap;
	}

	.toggle {
		color: var(--text-dim);
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
		color: var(--text-faint);
		font-style: italic;
		line-height: 1.7;
		margin: 0;
	}

	.positioned-count {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-dim);
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

	.weight-label {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--text-faint);
		margin-left: 6px;
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
	}

	.eval-text {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.section-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-muted);
		margin-bottom: 12px;
	}

	.alt-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.alt-item {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 12px 16px;
	}

	.alt-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
	}

	.alt-name {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
	}

	.match-label {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 1px;
		padding: 2px 7px;
		border-radius: var(--radius-xs);
		background: rgba(251, 191, 36, 0.08);
		color: var(--fit-adapt);
		border: 1px solid rgba(251, 191, 36, 0.2);
	}

	.match-label.strong {
		background: rgba(74, 222, 128, 0.08);
		color: var(--fit-natural);
		border-color: rgba(74, 222, 128, 0.2);
	}

	.alt-desc {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.path-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.path-item {
		background: rgba(74, 222, 128, 0.03);
		border: 1px solid rgba(74, 222, 128, 0.1);
		border-left: 2px solid rgba(74, 222, 128, 0.35);
		border-radius: var(--radius-sm);
		padding: 12px 16px;
	}

	.path-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
		flex-wrap: wrap;
	}

	.path-icon {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fit-natural);
	}

	.path-bridge {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fit-natural-text);
		font-weight: 700;
	}

	.path-from {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--text-faint);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.path-rationale {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0 0 8px;
	}

	.path-steps {
		margin: 0;
		padding-left: 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.path-steps li {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-dim);
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
		color: var(--text-dim);
		line-height: 1.6;
	}

	.source-author {
		color: var(--text-secondary);
	}

	.source-work {
		font-style: italic;
	}

	.interaction-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.interaction-item {
		border-left: 2px solid var(--border);
		padding: 10px 14px;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		background: var(--surface);
	}

	.interaction-item.synergy {
		border-left-color: rgba(74, 222, 128, 0.4);
	}

	.interaction-item.tension {
		border-left-color: rgba(251, 191, 36, 0.4);
	}

	.interaction-item.redundancy {
		border-left-color: rgba(255, 255, 255, 0.15);
	}

	.interaction-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 5px;
		flex-wrap: wrap;
	}

	.interaction-icon {
		font-family: var(--mono);
		font-size: 11px;
	}

	.interaction-item.synergy .interaction-icon {
		color: var(--fit-natural);
	}

	.interaction-item.tension .interaction-icon {
		color: var(--fit-adapt);
	}

	.interaction-item.redundancy .interaction-icon {
		color: var(--text-muted);
	}

	.interaction-other {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-secondary);
	}

	.interaction-type-label {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--text-faint);
	}

	.interaction-text {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}
</style>
