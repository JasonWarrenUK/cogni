<script lang="ts">
	import type { UserReference, Source } from '$lib/data/types.js';

	interface Props {
		methodSources: Source[];
		structuredReferences: UserReference[];
		freeformReferences: string;
		onadd: (ref: UserReference) => void;
		onremove: (index: number) => void;
		onfreeformchange: (value: string) => void;
	}

	let {
		methodSources,
		structuredReferences,
		freeformReferences,
		onadd,
		onremove,
		onfreeformchange,
	}: Props = $props();

	let newAuthor = $state('');
	let newWork = $state('');
	let newYear = $state('');
	let newNote = $state('');

	function handleAdd() {
		const author = newAuthor.trim();
		const work = newWork.trim();
		const note = newNote.trim();
		if (!author || !work) return;

		const ref: UserReference = { author, work, note };
		const yearNum = parseInt(newYear, 10);
		if (!isNaN(yearNum) && yearNum > 0) ref.year = yearNum;

		onadd(ref);

		newAuthor = '';
		newWork = '';
		newYear = '';
		newNote = '';
	}
</script>

<div class="library">
	{#if methodSources.length > 0}
		<div class="subsection">
			<div class="panel-label">From methodology evaluations</div>
			<div class="source-list">
				{#each methodSources as src}
					<div class="source-item source-item--readonly">
						<span class="source-author">{src.author}</span>
						{' — '}
						<span class="source-work">{src.work}</span>
						{' ('}
						{src.year}
						{'). '}
						<span class="source-note">{src.note}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="subsection">
		<div class="panel-label">Your references</div>

		{#if structuredReferences.length > 0}
			<div class="source-list">
				{#each structuredReferences as ref, i}
					<div class="source-item source-item--user">
						<div class="source-body">
							<span class="source-author">{ref.author}</span>
							{' — '}
							<span class="source-work">{ref.work}</span>
							{#if ref.year}
								{' ('}
								{ref.year}
								{')'}
							{/if}
							{#if ref.note}
								{'. '}
								<span class="source-note">{ref.note}</span>
							{/if}
						</div>
						<button class="remove-btn" onclick={() => onremove(i)} title="Remove reference">×</button>
					</div>
				{/each}
			</div>
		{/if}

		<div class="add-form">
			<div class="form-row">
				<input
					type="text"
					class="input"
					placeholder="Author"
					bind:value={newAuthor}
				/>
				<input
					type="number"
					class="input input--narrow"
					placeholder="Year"
					bind:value={newYear}
				/>
			</div>
			<input
				type="text"
				class="input"
				placeholder="Work (title, talk, essay...)"
				bind:value={newWork}
			/>
			<input
				type="text"
				class="input"
				placeholder="Note — why this matters to you"
				bind:value={newNote}
			/>
			<button class="add-btn" onclick={handleAdd} disabled={!newAuthor.trim() || !newWork.trim()}>
				Add reference
			</button>
		</div>
	</div>

	<div class="subsection">
		<div class="panel-label">Freeform notes</div>
		<textarea
			value={freeformReferences}
			oninput={(e) => onfreeformchange((e.target as HTMLTextAreaElement).value)}
			placeholder="Anything that doesn't fit the structured form..."
			class="textarea-base"
			style:min-height="120px"
		></textarea>
	</div>
</div>

<style>
	.library {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.source-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
	}

	.source-item {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-dim);
		line-height: 1.6;
		padding: 10px 12px;
		border-radius: var(--radius-xs);
	}

	.source-item--readonly {
		background: var(--surface);
		border: 1px solid var(--border-subtle);
	}

	.source-item--user {
		background: var(--surface);
		border: 1px solid var(--border);
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.source-body {
		flex: 1;
	}

	.source-author {
		color: var(--text-secondary);
	}

	.source-work {
		font-style: italic;
	}

	.source-note {
		color: var(--text-dim);
	}

	.remove-btn {
		background: none;
		border: none;
		color: var(--text-faint);
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		padding: 0;
		flex-shrink: 0;
		transition: color 0.2s;
	}

	.remove-btn:hover {
		color: var(--fit-friction);
	}

	.add-form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-row {
		display: flex;
		gap: 8px;
	}

	.input {
		width: 100%;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-xs);
		padding: 8px 12px;
		color: var(--text-secondary);
		font-family: var(--mono);
		font-size: 12px;
		outline: none;
	}

	.input:focus {
		border-color: var(--border-hover);
	}

	.input--narrow {
		width: 100px;
		flex-shrink: 0;
	}

	.add-btn {
		align-self: flex-start;
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 2px;
		padding: 7px 14px;
		border-radius: var(--radius-xs);
		cursor: pointer;
		border: 1px solid rgba(91, 141, 239, 0.3);
		background: rgba(91, 141, 239, 0.06);
		color: var(--accent-action);
		transition: border-color 0.2s, background 0.2s;
	}

	.add-btn:hover:not(:disabled) {
		border-color: rgba(91, 141, 239, 0.5);
		background: rgba(91, 141, 239, 0.12);
	}

	.add-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
