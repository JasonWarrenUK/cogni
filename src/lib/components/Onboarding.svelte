<script lang="ts">
	import TogglePanel from './TogglePanel.svelte';
</script>

<TogglePanel label="How this works">
	<div class="onboarding">
		<p class="intro">
			Cogni maps how you think onto how software methodologies are designed. Position yourself on each
			compass — not how you aspire to work, but how you actually do.
		</p> <!-- @draft -->

		<div class="steps">
			<div class="step">
				<div class="step-number">1</div>
				<div class="step-content">
					<div class="step-title">Position your compasses</div>
					<p class="step-desc">
						Each compass has two axes. Tap the quadrant that best describes you. The quadrants are
						not ranked — there is no correct answer. Crosshatched quadrants contradict a position
						you've already established elsewhere, so the grid catches contradictions for you.
					</p> <!-- @draft -->
				</div>
			</div>

			<div class="step">
				<div class="step-number">2</div>
				<div class="step-content">
					<div class="step-title">Set your intensity</div>
					<p class="step-desc">
						After positioning, set the intensity: how strongly does this describe you? Low (0) means
						it's a mild tendency; high (2) means it's a defining feature. Strong signals weight more
						heavily in the methodology evaluations.
					</p> <!-- @draft -->
				</div>
			</div>

			<div class="step">
				<div class="step-number">3</div>
				<div class="step-content">
					<div class="step-title">Read your methodology relations</div>
					<p class="step-desc">
						Part 2 evaluates how each methodology — TDD, Scrum, Shape Up, and others — fits your
						cognitive profile. Natural fit means the methodology is designed for your style. Friction
						means it works against it, and you'll see entry points for bridging the gap.
					</p> <!-- @draft -->
				</div>
			</div>

			<div class="step">
				<div class="step-number">4</div>
				<div class="step-content">
					<div class="step-title">Suggested order</div>
					<p class="step-desc">
						Start with Tier 1 compasses (the concrete process ones) — they have the most direct
						impact on the methodology evaluations. Tier 2 are cognitive modifiers that refine the
						picture. Tier 3 are foundational: they explain <em>why</em> you land where you do in
						Tier 1 and 2.
					</p> <!-- @draft -->
				</div>
			</div>
		</div>

		<p class="note">
			Your profile is stored locally in your browser. Nothing leaves your device. Export JSON to
			back it up or share it.
		</p> <!-- @draft -->
	</div>
</TogglePanel>

<style>
	.onboarding {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.intro {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.8;
		margin: 0;
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.step {
		display: flex;
		gap: 16px;
		align-items: flex-start;
	}

	.step-number {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-faint);
		border: 1px solid var(--border);
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.step-content {
		flex: 1;
	}

	.step-title {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 5px;
	}

	.step-desc {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}

	.note {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
		line-height: 1.7;
		margin: 0;
		padding-top: 8px;
		border-top: 1px solid var(--border-subtle);
	}
</style>
