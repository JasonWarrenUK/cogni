<script lang="ts">
	import type { Compass, CompassData, CompassDataMap } from '$lib/data/types.js';
	import { getConstraints } from '$lib/logic/constraints.js';

	interface Props {
		compass: Compass;
		data: CompassData;
		compassData: CompassDataMap;
		onChange: (data: Partial<CompassData>) => void;
	}

	let { compass, data, compassData, onChange }: Props = $props();

	const INTENSITY_LABELS = ['Centre', 'Moderate', 'Strong'] as const;
	const HATCH = 'repeating-linear-gradient(-45deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)';

	let constraints = $derived(getConstraints(compass, compassData));
	let hasSelection = $derived(data.quadrant !== null && data.quadrant !== undefined);

	function toggleQuadrant(index: number) {
		if (data.quadrant === index) {
			onChange({ quadrant: null, intensity: 0 });
		} else {
			onChange({ quadrant: index, intensity: data.intensity || 1 });
		}
	}

	function getQuadBackground(index: number): string {
		if (data.quadrant === index) return `${compass.accent}18`;
		if (constraints.conflicts[index]) return HATCH;
		return 'rgba(255,255,255,0.02)';
	}

	function getQuadBorder(index: number): string {
		if (data.quadrant === index) return `1px solid ${compass.accent}55`;
		if (constraints.conflicts[index]) return '1px solid rgba(255,255,255,0.04)';
		return '1px solid rgba(255,255,255,0.06)';
	}

	function getLabelColor(index: number): string {
		if (data.quadrant === index) return compass.accent;
		if (constraints.conflicts[index]) return '#666';
		return '#bbb';
	}

	function getDescColor(index: number): string {
		if (data.quadrant === index) return '#ddd';
		if (constraints.conflicts[index]) return '#555';
		return '#888';
	}
</script>

<div class="grid-wrapper">
	<div class="axis-label axis-top">{compass.ax2.high}</div>

	<div class="grid-row">
		<div class="axis-label axis-left">{compass.ax1.high}</div>

		<div class="quad-grid">
			{#each compass.quads as quad, i}
				<button
					onclick={() => toggleQuadrant(i)}
					style:background={getQuadBackground(i)}
					style:border={getQuadBorder(i)}
					class="quad-button"
				>
					<div class="quad-label" style:color={getLabelColor(i)} style:font-weight={data.quadrant === i ? 'bold' : 'normal'}>
						{quad.label}
					</div>
					<div class="quad-desc" style:color={getDescColor(i)}>
						{quad.desc}
					</div>
				</button>
			{/each}
		</div>

		<div class="axis-label axis-right">{compass.ax1.low}</div>
	</div>

	<div class="axis-label axis-bottom">{compass.ax2.low}</div>

	{#if constraints.reasons.length > 0}
		<div class="reasons">
			{#each constraints.reasons as reason}
				<div class="reason">
					<div class="reason-dot" style:background={reason.accent}></div>
					<span>
						<span class="reason-dim">{reason.dim}</span>
						{' '}established as{' '}
						<span style:color={reason.accent}>{reason.est}</span>
						{' '}in {reason.from}
					</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if hasSelection}
		<div class="intensity">
			<span class="intensity-label">Intensity</span>
			<div class="intensity-buttons">
				{#each INTENSITY_LABELS as label, idx}
					<button
						onclick={() => onChange({ ...data, intensity: idx as 0 | 1 | 2 })}
						style:border={data.intensity === idx ? `1px solid ${compass.accent}` : '1px solid rgba(255,255,255,0.12)'}
						style:background={data.intensity === idx ? `${compass.accent}22` : 'transparent'}
						style:color={data.intensity === idx ? compass.accent : '#999'}
						class="intensity-btn"
					>
						{label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.grid-wrapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.axis-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: #999;
		text-align: center;
	}

	.axis-top,
	.axis-bottom {
		letter-spacing: 3px;
	}

	.grid-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.axis-left {
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		min-width: 16px;
	}

	.axis-right {
		writing-mode: vertical-lr;
		min-width: 16px;
	}

	.quad-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3px;
		flex: 1;
		max-width: 420px;
	}

	.quad-button {
		border-radius: 8px;
		padding: 16px 12px;
		cursor: pointer;
		text-align: left;
		transition: all 0.3s ease;
		outline: none;
	}

	.quad-label {
		font-family: var(--mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 6px;
	}

	.quad-desc {
		font-family: var(--mono);
		font-size: 11px;
		line-height: 1.5;
	}

	.reasons {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 4px;
	}

	.reason {
		font-family: var(--mono);
		font-size: 10px;
		color: #777;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.reason-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.reason-dim {
		color: #999;
	}

	.intensity {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
	}

	.intensity-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: #999;
	}

	.intensity-buttons {
		display: flex;
		gap: 8px;
	}

	.intensity-btn {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 2px;
		padding: 6px 14px;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}
</style>
