<script lang="ts">
	import type { CompassDataMap } from '$lib/data/types.js';
	import { synthesiseCognitiveIdentity } from '$lib/logic/identity.js';

	interface Props {
		compassData: CompassDataMap;
	}

	let { compassData }: Props = $props();

	let identity = $derived(synthesiseCognitiveIdentity(compassData));
</script>

{#if identity}
	<div class="identity panel">
		<div class="panel-label">Cognitive identity</div>

		{#if identity.narrative.sentences.length > 0}
			<div class="narrative">
				{#each identity.narrative.sentences as sentence}
					<p class="sentence">{sentence}</p>
				{/each}
			</div>
		{/if}

		{#if identity.foundationLinks.length > 0}
			<div class="links">
				<div class="links-label">Foundation links</div>
				{#each identity.foundationLinks as link}
					<div class="link" class:agreement={link.agreement} class:conflict={!link.agreement}>
						<div class="link-axis">{link.axis}</div>
						<div class="link-compasses">
							<span class="link-compass">
								<span class="link-dot" style:background={link.tier3Compass.accent}></span>
								<span class="link-name">{link.tier3Compass.title}</span>
								<span class="link-dir" style:color={link.tier3Compass.accent}>{link.tier3Compass.dirLabel}</span>
							</span>
							<span class="link-sep">{link.agreement ? '=' : '≠'}</span>
							<span class="link-compass">
								<span class="link-dot" style:background={link.tier12Compass.accent}></span>
								<span class="link-name">{link.tier12Compass.title}</span>
								<span class="link-dir" style:color={link.tier12Compass.accent}>{link.tier12Compass.dirLabel}</span>
							</span>
						</div>
						<p class="link-explanation">{link.explanation}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.identity {
		padding: 20px 24px;
		margin-bottom: 32px;
	}

	.narrative {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 20px;
	}

	.sentence {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0;
	}

	.links {
		border-top: 1px solid var(--border-subtle);
		padding-top: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.links-label {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-faint);
		margin-bottom: 4px;
	}

	.link {
		padding: 12px 14px;
		border-radius: var(--radius-sm);
		border-left: 2px solid var(--border);
		background: var(--surface);
	}

	.link.agreement {
		border-left-color: rgba(74, 222, 128, 0.3);
	}

	.link.conflict {
		border-left-color: rgba(251, 191, 36, 0.3);
	}

	.link-axis {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--text-faint);
		margin-bottom: 6px;
	}

	.link-compasses {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 8px;
	}

	.link-compass {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.link-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.link-name {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-dim);
	}

	.link-dir {
		font-family: var(--mono);
		font-size: 10px;
	}

	.link-sep {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-faint);
	}

	.link-explanation {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
