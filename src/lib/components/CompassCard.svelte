<script lang="ts">
	import type { Compass, CompassData, CompassDataMap } from '$lib/data/types.js';
	import FadeIn from './FadeIn.svelte';
	import CompassGrid from './CompassGrid.svelte';

	interface Props {
		compass: Compass;
		data: CompassData;
		compassData: CompassDataMap;
		index: number;
		onchange: (id: string, data: Partial<CompassData>) => void;
	}

	let { compass, data, compassData, index, onchange }: Props = $props();

	let expanded = $state(false);

	let hasSelection = $derived(data.quadrant !== null && data.quadrant !== undefined);
</script>

<FadeIn delay={index * 0.06} from="left">
	<div class="card" class:expanded>
		<button class="card-header" onclick={() => (expanded = !expanded)}>
			<div
				class="indicator"
				style:background={hasSelection ? compass.accent : 'rgba(255,255,255,0.15)'}
				style:box-shadow={hasSelection ? `0 0 12px ${compass.accent}44` : 'none'}
			></div>

			<div class="header-text">
				<div class="title" style:color={expanded ? compass.accent : 'var(--text)'}>
					{compass.title}
				</div>
				<div class="subtitle">{compass.subtitle}</div>
			</div>

			<div class="tier-badge">T{compass.tier}</div>
			<div class="toggle" class:rotated={expanded}>+</div>
		</button>

		{#if expanded}
			<div class="card-body">
				<div class="axes-info">
					{#each ['ax1', 'ax2'] as key}
						<div>
							<div class="axis-key">{key === 'ax1' ? 'Axis 1' : 'Axis 2'}</div>
							<div class="axis-name">{compass[key as 'ax1' | 'ax2'].label}</div>
							<div class="axis-range">
								{compass[key as 'ax1' | 'ax2'].low} ←→ {compass[key as 'ax1' | 'ax2'].high}
							</div>
						</div>
					{/each}
				</div>

				<CompassGrid
					{compass}
					{data}
					{compassData}
					onChange={(d) => onchange(compass.id, d)}
				/>

				{#if compass.informs}
					<div class="informs" style:border-left-color={compass.accent} style:background="{compass.accent}0f">
						<div class="informs-label">This informs how I relate to</div>
						<div class="informs-text">{compass.informs}</div>
					</div>
				{/if}
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
		font-size: clamp(20px, 3vw, 28px);
		transition: color 0.3s ease;
	}

	.subtitle {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-dim);
		margin-top: 2px;
	}

	.tier-badge {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-faint);
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

	.axes-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		border-top: 1px solid var(--border);
		padding-top: 16px;
	}

	.axis-key {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-dim);
		margin-bottom: 4px;
	}

	.axis-name {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
	}

	.axis-range {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-dim);
		margin-top: 2px;
	}

	.informs {
		border-left: 2px solid;
		border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
		padding: 12px 16px;
	}

	.informs-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-muted);
		margin-bottom: 6px;
	}

	.informs-text {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.6;
	}
</style>
