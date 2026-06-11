<script lang="ts">
	const USES = [
		{
			icon: '↔',
			title: 'Before a 1:1',
			desc: "Share your profile with your manager or a direct report before a working-relationship conversation. It gives both sides a concrete starting point — 'here's how I think about this' beats 'I prefer this style'.", // @draft
		},
		{
			icon: '⊙',
			title: 'Evaluating a methodology',
			desc: "Before adopting a new process — TDD, Shape Up, a daily standup — check the friction score first. It doesn't tell you not to adopt it; it tells you where the friction will come from so you can plan for it.", // @draft
		},
		{
			icon: '⊕',
			title: 'Building a working agreement',
			desc: "Compare profiles with a colleague before starting a project. Overlapping positions suggest default practices; diverging ones surface where you'll need explicit agreements about how to work together.", // @draft
		},
		{
			icon: '◌',
			title: 'Tracking growth',
			desc: "Revisit your profile after 3–6 months on a new project or team. Positions that shifted are the ones where the environment changed your defaults — notice which direction and decide whether you want to keep the change.", // @draft
		},
	];
</script>

<div class="profile-uses">
	<div class="uses-label">Use cases for this profile</div>
	<div class="uses-grid">
		{#each USES as use}
			<div class="use-item">
				<div class="use-header">
					<span class="use-icon">{use.icon}</span>
					<span class="use-title">{use.title}</span>
				</div>
				<p class="use-desc">{use.desc}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.profile-uses {
		padding: 32px 0 16px;
	}

	.uses-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		color: var(--text-faint);
		margin-bottom: 20px;
	}

	.uses-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}

	@media (max-width: 640px) {
		.uses-grid {
			grid-template-columns: 1fr;
		}
	}

	.use-item {
		padding: 14px 16px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
	}

	.use-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 8px;
	}

	.use-icon {
		font-family: var(--mono);
		font-size: 14px;
		color: var(--text-faint);
		flex-shrink: 0;
	}

	.use-title {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.use-desc {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}
</style>
