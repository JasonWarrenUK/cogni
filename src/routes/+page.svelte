<script lang="ts">
	import { onMount } from 'svelte';
	import { COMPASSES } from '$lib/data/compasses.js';
	import { ESTABLISHED_METHODS } from '$lib/data/methods.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { exportProfile, exportProfileMarkdown, importProfile, triggerFileInput } from '$lib/utils/io.js';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import CompassCard from '$lib/components/CompassCard.svelte';
	import MethodCard from '$lib/components/MethodCard.svelte';
	import MethodInteractions from '$lib/components/MethodInteractions.svelte';
	import PracticeStacks from '$lib/components/PracticeStacks.svelte';
	import ContextSelector from '$lib/components/ContextSelector.svelte';
	import ConstraintNetwork from '$lib/components/ConstraintNetwork.svelte';
	import ProfileSynthesis from '$lib/components/ProfileSynthesis.svelte';
	import ReferenceLibrary from '$lib/components/ReferenceLibrary.svelte';
	import CognitiveIdentity from '$lib/components/CognitiveIdentity.svelte';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import { evaluateMethod } from '$lib/logic/evaluation.js';

	let heroVisible = $state(false);
	let scrollY = $state(0);
	let clearArmed = $state(false);
	let clearTimer: ReturnType<typeof setTimeout> | null = null;

	const tier12 = COMPASSES.filter((c) => c.tier <= 2);
	const tier3 = COMPASSES.filter((c) => c.tier === 3);

	// Collect all methodology sources for the reference library
	const allMethodSources = ESTABLISHED_METHODS.flatMap((m) => m.sources);
	// Deduplicate by author+work
	const uniqueMethodSources = allMethodSources.filter(
		(src, i, arr) => arr.findIndex((s) => s.author === src.author && s.work === src.work) === i,
	);

	// Pre-compute all method evaluations for the interactions panel (context-aware)
	const methodEvaluations = $derived(
		Object.fromEntries(
			ESTABLISHED_METHODS.map((m) => [m.id, evaluateMethod(m, profile.compassData, profile.projectContext)]),
		),
	);
	const methodNamesMap = Object.fromEntries(ESTABLISHED_METHODS.map((m) => [m.id, m.name]));

	const anyPositioned = $derived(
		COMPASSES.some(
			(c) =>
				profile.compassData[c.id]?.quadrant !== null &&
				profile.compassData[c.id]?.quadrant !== undefined,
		),
	);

	const anyTier3Positioned = $derived(
		tier3.some(
			(c) =>
				profile.compassData[c.id]?.quadrant !== null &&
				profile.compassData[c.id]?.quadrant !== undefined,
		),
	);

	onMount(() => {
		heroVisible = true;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function handleExport() {
		exportProfile(
			profile.compassData,
			profile.growth,
			profile.references,
			profile.structuredReferences,
		);
	}

	function handleExportMarkdown() {
		exportProfileMarkdown(
			profile.compassData,
			profile.growth,
			profile.structuredReferences,
			profile.projectContext,
		);
	}

	function handleImport() {
		triggerFileInput((file) => {
			importProfile(
				file,
				(compassData, growth, references, structuredReferences) => {
					for (const [id, data] of Object.entries(compassData)) {
						if (data) profile.updateCompass(id, data);
					}
					profile.updateGrowth('developing', growth.developing);
					profile.updateGrowth('questions', growth.questions);
					profile.references = references;
					for (const ref of structuredReferences) {
						profile.addReference(ref);
					}
				},
				(err) => console.error('Import failed:', err),
			);
		});
	}

	function handleClearClick() {
		if (!clearArmed) {
			clearArmed = true;
			if (clearTimer) clearTimeout(clearTimer);
			clearTimer = setTimeout(() => {
				clearArmed = false;
			}, 3000);
		} else {
			profile.reset();
			clearArmed = false;
			if (clearTimer) clearTimeout(clearTimer);
		}
	}
</script>

<svelte:head>
	<title>Developer Cognition Profile</title>
	<meta name="theme-color" content="#0a0a0b" />
	<meta property="og:title" content="Developer Cognition Profile" />
	<meta property="og:description" content="A cognitive framework for software practice" />
</svelte:head>

<!-- Hero -->
<div class="hero">
	<div class="hero-glow"></div>

	<div
		class="hero-eyebrow"
		style:opacity={heroVisible ? '1' : '0'}
		style:transform="translateY({scrollY * -0.1}px)"
	>
		A cognitive framework for software practice
	</div>

	<h1
		class="hero-title"
		style:opacity={heroVisible ? '1' : '0'}
		style:transform="translateY({scrollY * -0.15}px)"
	>
		Developer Cognition Profile
	</h1>

	<div
		class="hero-count"
		style:opacity={heroVisible ? '1' : '0'}
		style:transform="translateY({scrollY * -0.05}px)"
	>
		{profile.positionedCount} / {COMPASSES.length} compasses positioned
	</div>

	<div class="hero-scroll">Scroll to begin</div>
</div>

<!-- Main content -->
<div class="container">

	<!-- Sticky toolbar -->
	<FadeIn>
		<div class="toolbar">
			<span class="save-indicator" class:unsaved={profile.saveStatus === 'unsaved'}>
				{profile.saveStatus === 'saved' ? 'Saved' : 'Saving…'}
			</span>
			<button
				class="btn-danger"
				class:armed={clearArmed}
				onclick={handleClearClick}
			>
				{clearArmed ? 'Confirm clear' : 'Clear all'}
			</button>
			<button class="btn-secondary" onclick={handleImport}>Import</button>
			<button class="btn-secondary" onclick={handleExportMarkdown}>Export MD</button>
			<button class="btn-primary" onclick={handleExport}>Export JSON</button>
		</div>
	</FadeIn>

	<!-- Part 1: Compasses (Tier 1 & 2) -->
	<section class="section">
		<FadeIn>
			<div class="part-label">Part 1</div>
			<h2 class="section-title">Compasses</h2>
			<p class="section-desc">
				Position yourself on each compass by considering both axes together. Crosshatched quadrants
				would contradict a position you've already established elsewhere.
			</p>
			<ConstraintNetwork compassData={profile.compassData} />
		</FadeIn>

		{#each tier12 as compass, i}
			<CompassCard
				{compass}
				data={profile.compassData[compass.id]}
				compassData={profile.compassData}
				index={i}
				onchange={(id, data) => profile.updateCompass(id, data)}
			/>
		{/each}
	</section>

	<!-- Profile Synthesis (between compasses and methods) -->
	{#if anyPositioned}
		<FadeIn>
			<div class="synthesis-bridge">
				<ProfileSynthesis compassData={profile.compassData} />
			</div>
		</FadeIn>
	{/if}

	<!-- Part 2: Methodology Relations -->
	<section class="section section-shaded">
		<FadeIn>
			<div class="part-label">Part 2</div>
			<h2 class="section-title">Methodology Relations</h2>
			<p class="section-desc">
				{#if anyPositioned}
					How your cognitive profile relates to commonly-promoted development methodologies. Each
					assessment is computed live from your compass positions — with alternatives and supporting
					voices from experienced practitioners who've made the same arguments.
				{:else}
					Position compasses in Part 1 to see how your cognitive profile relates to established
					development methodologies.
				{/if}
			</p>
		</FadeIn>

		{#if anyPositioned}
			<FadeIn>
				<ContextSelector
					context={profile.projectContext}
					onchange={(ctx) => profile.updateProjectContext(ctx)}
				/>
			</FadeIn>
		{/if}

		{#each ESTABLISHED_METHODS as method}
			<MethodCard {method} compassData={profile.compassData} context={profile.projectContext} />
		{/each}

		{#if anyPositioned}
			<FadeIn delay={0.1}>
				<MethodInteractions
					evaluations={methodEvaluations}
					methodNames={methodNamesMap}
					compassData={profile.compassData}
				/>
			</FadeIn>

			<FadeIn delay={0.2}>
				<PracticeStacks compassData={profile.compassData} context={profile.projectContext} />
			</FadeIn>
		{/if}
	</section>

	<!-- Part 3: Cognitive Foundations (Tier 3) -->
	<section class="section">
		<FadeIn>
			<div class="part-label">Part 3</div>
			<h2 class="section-title">Cognitive Foundations</h2>
			<p class="section-desc">
				Deeper cognitive patterns. Some directly evaluate methodologies — the <em>informs</em> label
				on each card shows which methods they feed into. Others characterise your cognition without
				mapping to specific methodologies: they explain the <em>why</em> behind your Part 1
				positions.
			</p>
		</FadeIn>

		{#each tier3 as compass, i}
			<CompassCard
				{compass}
				data={profile.compassData[compass.id]}
				compassData={profile.compassData}
				index={i}
				onchange={(id, data) => profile.updateCompass(id, data)}
			/>
		{/each}

		{#if anyTier3Positioned}
			<FadeIn delay={0.1}>
				<CognitiveIdentity compassData={profile.compassData} />
			</FadeIn>
		{/if}
	</section>

	<!-- Part 4: Reference Library -->
	<section class="section section-shaded">
		<FadeIn>
			<div class="part-label">Part 4</div>
			<h2 class="section-title">Reference Library</h2>
			<p class="section-desc">The talks, essays, and books that inform your positions.</p>
		</FadeIn>

		<FadeIn delay={0.1}>
			<TogglePanel label="Reference library">
				<ReferenceLibrary
					methodSources={uniqueMethodSources}
					structuredReferences={profile.structuredReferences}
					freeformReferences={profile.references}
					onadd={(ref) => profile.addReference(ref)}
					onremove={(i) => profile.removeReference(i)}
					onfreeformchange={(v) => (profile.references = v)}
				/>
			</TogglePanel>
		</FadeIn>
	</section>

	<!-- Footer -->
	<footer>
		<div class="footer-version">Developer Cognition Profile v0.6</div>
		<div class="footer-credit">Originated by Jason Warren &amp; Claude, February 2026</div>
		<div class="footer-motto">A profile that never changes probably isn't being honest.</div>
	</footer>
</div>

<style>
	.hero {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 400px;
		background: radial-gradient(
			ellipse at 50% 30%,
			rgba(91, 141, 239, 0.06) 0%,
			transparent 60%
		);
		pointer-events: none;
	}

	.hero-eyebrow {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: var(--text-dim);
		margin-bottom: 16px;
		transition: opacity 1.2s ease 0.3s;
	}

	.hero-title {
		font-family: var(--serif);
		font-size: clamp(36px, 7vw, 72px);
		color: var(--text);
		text-align: center;
		line-height: 1.1;
		margin: 0;
		transition: opacity 1.2s ease 0.6s;
	}

	.hero-count {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-dim);
		margin-top: 20px;
		letter-spacing: 1px;
		transition: opacity 1.2s ease 0.9s;
	}

	.hero-scroll {
		position: absolute;
		bottom: 40px;
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: var(--text-dim);
		animation: pulse 3s ease infinite;
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.toolbar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 12px;
		padding: 24px 0;
		border-bottom: 1px solid var(--border);
		margin-bottom: 40px;
		position: sticky;
		top: 0;
		z-index: 10;
		background: linear-gradient(to bottom, var(--bg) 80%, transparent);
		flex-wrap: wrap;
	}

	.save-indicator {
		font-family: var(--mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--fit-natural);
		margin-right: auto;
		transition: color 0.3s ease;
	}

	.save-indicator.unsaved {
		color: var(--text-faint);
	}

	.btn-secondary {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding: 8px 16px;
		border-radius: var(--radius-xs);
		cursor: pointer;
		border: 1px solid var(--border-interactive);
		background: transparent;
		color: var(--text-muted);
		transition: border-color 0.2s, color 0.2s, background 0.2s;
	}

	.btn-secondary:hover {
		border-color: var(--border-hover);
		color: var(--text);
		background: var(--surface);
	}

	.btn-primary {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding: 8px 16px;
		border-radius: var(--radius-xs);
		cursor: pointer;
		border: 1px solid rgba(91, 141, 239, 0.4);
		background: rgba(91, 141, 239, 0.08);
		color: var(--accent-action);
		transition: border-color 0.2s, background 0.2s;
	}

	.btn-primary:hover {
		border-color: rgba(91, 141, 239, 0.6);
		background: rgba(91, 141, 239, 0.14);
	}

	.btn-danger {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding: 8px 16px;
		border-radius: var(--radius-xs);
		cursor: pointer;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text-faint);
		transition: border-color 0.2s, color 0.2s, background 0.2s;
	}

	.btn-danger:hover {
		border-color: var(--border-interactive);
		color: var(--text-muted);
	}

	.btn-danger.armed {
		border-color: rgba(248, 113, 113, 0.4);
		background: rgba(248, 113, 113, 0.08);
		color: var(--fit-friction);
	}

	.btn-danger.armed:hover {
		border-color: rgba(248, 113, 113, 0.6);
		background: rgba(248, 113, 113, 0.14);
	}

	.synthesis-bridge {
		padding: 0 0 32px;
	}

	.section {
		padding-top: 80px;
		padding-bottom: 80px;
	}

	.section-shaded {
		background: var(--surface);
		border-radius: var(--radius-lg);
		margin-left: -24px;
		margin-right: -24px;
		padding-left: 24px;
		padding-right: 24px;
	}

	.part-label {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: var(--text-faint);
		margin-bottom: 8px;
	}

	.section-title {
		font-family: var(--serif);
		font-size: clamp(28px, 4vw, 42px);
		color: var(--text);
		margin: 0 0 12px;
		font-weight: normal;
	}

	.section-desc {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0 0 40px;
		max-width: 660px;
	}

	footer {
		padding: 40px 0 80px;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.footer-version {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: var(--text-faint);
		margin-bottom: 12px;
	}

	.footer-credit {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
	}

	.footer-motto {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
		font-style: italic;
		margin-top: 8px;
	}

	@media (max-width: 640px) {
		.section {
			padding-top: 48px;
			padding-bottom: 48px;
		}

		.toolbar {
			gap: 8px;
		}

		.btn-primary,
		.btn-secondary,
		.btn-danger {
			padding: 7px 12px;
			letter-spacing: 2px;
		}
	}
</style>
