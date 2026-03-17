<script lang="ts">
	interface Props {
		label: string;
		open?: boolean;
		children?: import('svelte').Snippet;
	}

	let { label, open = false, children }: Props = $props();
</script>

<details {open}>
	<summary class="toggle-summary">
		<span class="toggle-label">{label}</span>
		<span class="toggle-icon">+</span>
	</summary>
	<div class="toggle-body">
		{@render children?.()}
	</div>
</details>

<style>
	details {
		margin-bottom: 32px;
	}

	.toggle-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		list-style: none;
		padding: 10px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		transition: background 0.2s ease, border-color 0.2s ease;
		user-select: none;
	}

	.toggle-summary::-webkit-details-marker {
		display: none;
	}

	.toggle-summary:hover {
		background: var(--surface);
		border-color: var(--border-interactive);
	}

	.toggle-label {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-faint);
	}

	.toggle-icon {
		font-family: var(--mono);
		font-size: 16px;
		color: var(--text-dim);
		transition: transform 0.3s ease;
		line-height: 1;
	}

	details[open] .toggle-icon {
		transform: rotate(45deg);
	}

	.toggle-body {
		padding-top: 16px;
	}
</style>
