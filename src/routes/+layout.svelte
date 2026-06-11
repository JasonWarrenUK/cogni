<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Space+Mono:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(:root) {
		/* Typefaces */
		--serif: 'Instrument Serif', serif;
		--mono: 'Space Mono', monospace;

		/* Background & surface */
		--bg: #0a0a0b;
		--surface: rgba(255, 255, 255, 0.02);
		--surface-raised: rgba(255, 255, 255, 0.03);

		/* Borders */
		--border: rgba(255, 255, 255, 0.06);
		--border-subtle: rgba(255, 255, 255, 0.04);
		--border-interactive: rgba(255, 255, 255, 0.1);
		--border-hover: rgba(255, 255, 255, 0.2);

		/* Text */
		--text: #f0f0f0;
		--text-secondary: #bbb;
		--text-muted: #999;
		--text-dim: #777;
		--text-faint: #666;

		/* Semantic fit colours */
		--fit-natural: #4ade80;
		--fit-adapt: #fbbf24;
		--fit-friction: #f87171;

		/* Accent colours */
		--accent-action: #5b8def;
		--accent-meta: #a78bfa;

		/* Fit tint colours (for backgrounds/soft highlights) */
		--fit-natural-soft: rgba(74, 222, 128, 0.08);
		--fit-natural-text: #d1fae5;
		--fit-meta-text: #c4b5fd;

		/* Border radii */
		--radius-lg: 16px;
		--radius-md: 12px;
		--radius-sm: 8px;
		--radius-xs: 6px;

		/* Focus ring */
		--focus-ring: 0 0 0 2px rgba(91, 141, 239, 0.6);
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--bg);
		color: var(--text);
		font-family: var(--mono);
	}

	:global(::placeholder) {
		color: var(--text-faint);
	}

	/* Global focus-visible ring — applied to all interactive elements */
	:global(:focus-visible) {
		outline: none;
		box-shadow: var(--focus-ring);
	}

	:global(::-webkit-scrollbar) {
		width: 6px;
	}

	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	/* Shared utility: panel container */
	:global(.panel) {
		padding: 16px 20px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
	}

	/* Shared utility: uppercase mono section label */
	:global(.panel-label) {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-faint);
		margin-bottom: 12px;
	}

	/* Shared utility: textarea base */
	:global(.textarea-base) {
		width: 100%;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 14px;
		color: var(--text-secondary);
		font-family: var(--mono);
		font-size: 12px;
		line-height: 1.7;
		resize: vertical;
		outline: none;
		display: block;
	}

	:global(.textarea-base:focus) {
		border-color: var(--border-hover);
	}

	@keyframes -global-fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes -global-pulse {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
