<script lang="ts">
	import type { ProjectContext, ProjectPhase, TeamSize } from '$lib/data/types.js';

	interface Props {
		context: ProjectContext;
		onchange: (ctx: Partial<ProjectContext>) => void;
	}

	let { context, onchange }: Props = $props();

	const PHASES: { value: ProjectPhase; label: string; desc: string }[] = [
		{ value: 'greenfield', label: 'Greenfield', desc: 'New codebase' },
		{ value: 'legacy', label: 'Legacy', desc: 'Existing, constrained codebase' },
		{ value: 'research', label: 'Research', desc: 'Exploration / spike' },
		{ value: 'maintenance', label: 'Maintenance', desc: 'Ongoing, stable system' },
	];

	const TEAM_SIZES: { value: TeamSize; label: string; desc: string }[] = [
		{ value: 'solo', label: 'Solo', desc: 'Just you' },
		{ value: 'small', label: 'Small team', desc: '2–5 people' },
		{ value: 'large', label: 'Large team', desc: '6+ people' },
	];

	function togglePhase(phase: ProjectPhase) {
		onchange({ phase: context.phase === phase ? null : phase });
	}

	function toggleTeamSize(size: TeamSize) {
		onchange({ teamSize: context.teamSize === size ? null : size });
	}
</script>

<div class="context-selector panel">
	<div class="panel-label">
		Project context
		<span class="context-hint">· refines methodology fit</span>
	</div>

	<div class="context-groups">
		<div class="context-group">
			<div class="group-label">Phase</div>
			<div class="toggle-row">
				{#each PHASES as phase}
					<button
						class="toggle-btn"
						class:active={context.phase === phase.value}
						onclick={() => togglePhase(phase.value)}
						title={phase.desc}
					>
						{phase.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="context-group">
			<div class="group-label">Team</div>
			<div class="toggle-row">
				{#each TEAM_SIZES as size}
					<button
						class="toggle-btn"
						class:active={context.teamSize === size.value}
						onclick={() => toggleTeamSize(size.value)}
						title={size.desc}
					>
						{size.label}
					</button>
				{/each}
			</div>
		</div>
	</div>

	{#if context.phase !== null || context.teamSize !== null}
		<div class="context-active">
			Context active — methodology scores adjusted
		</div>
	{/if}
</div>

<style>
	.context-selector {
		margin-bottom: 24px;
	}

	.context-hint {
		color: var(--text-faint);
		text-transform: none;
		letter-spacing: 0;
		font-size: 10px;
	}

	.context-groups {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
	}

	.context-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.group-label {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--text-faint);
	}

	.toggle-row {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.toggle-btn {
		font-family: var(--mono);
		font-size: 10px;
		padding: 4px 12px;
		border-radius: 20px;
		border: 1px solid var(--border-interactive);
		background: transparent;
		color: var(--text-faint);
		cursor: pointer;
		transition: all 0.2s ease;
		letter-spacing: 0.5px;
	}

	.toggle-btn:hover {
		border-color: var(--border-hover);
		color: var(--text-muted);
	}

	.toggle-btn.active {
		border-color: rgba(167, 139, 250, 0.5);
		background: rgba(167, 139, 250, 0.08);
		color: #c4b5fd;
	}

	.context-active {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--accent-meta);
		margin-top: 12px;
		letter-spacing: 0.5px;
	}
</style>
