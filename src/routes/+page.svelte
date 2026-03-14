<script lang="ts">
	import { onMount } from 'svelte';
	import { COMPASSES } from '$lib/data/compasses.js';
	import { ESTABLISHED_METHODS } from '$lib/data/methods.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { exportProfile, importProfile, triggerFileInput } from '$lib/utils/io.js';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import CompassCard from '$lib/components/CompassCard.svelte';
	import MethodCard from '$lib/components/MethodCard.svelte';

	let heroVisible = $state(false);
	let scrollY = $state(0);

	const tier12 = COMPASSES.filter((c) => c.tier <= 2);
	const tier3 = COMPASSES.filter((c) => c.tier === 3);

	const anyPositioned = $derived(
		COMPASSES.some(
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
		exportProfile(profile.compassData, profile.growth, profile.references);
	}

	function handleImport() {
		triggerFileInput((file) => {
			importProfile(
				file,
				(compassData, growth, references) => {
					for (const [id, data] of Object.entries(compassData)) {
						if (data) profile.updateCompass(id, data);
					}
					profile.updateGrowth('developing', growth.developing);
					profile.updateGrowth('questions', growth.questions);
					profile.references = references;
				},
				(err) => console.error('Import failed:', err),
			);
		});
	}
</script>

<svelte:head>
	<title>Developer Cognition Profile</title>
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
			<button class="btn-secondary" onclick={handleImport}>Import</button>
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

		{#each ESTABLISHED_METHODS as method}
			<MethodCard {method} compassData={profile.compassData} />
		{/each}
	</section>

	<!-- Part 3: Cognitive Foundations (Tier 3) -->
	<section class="section">
		<FadeIn>
			<div class="part-label">Part 3</div>
			<h2 class="section-title">Cognitive Foundations</h2>
			<p class="section-desc">
				Deeper patterns that contextualise everything above. They don't map to specific practices —
				they explain why you arrived at your positions.
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
	</section>

	<!-- Part 4: Growth Edges -->
	<section class="section section-shaded">
		<FadeIn>
			<div class="part-label">Part 4</div>
			<h2 class="section-title">Growth Edges</h2>
			<p class="section-desc">
				Frame these honestly — as areas of genuine development, not weaknesses repackaged as
				strengths.
			</p>
		</FadeIn>

		<FadeIn delay={0.1}>
			<div class="growth-field">
				<h3 class="growth-label">Currently developing</h3>
				<textarea
					value={profile.growth.developing}
					oninput={(e) =>
						profile.updateGrowth('developing', (e.target as HTMLTextAreaElement).value)}
					placeholder="2-3 areas where you're building competence..."
					class="textarea"
					style:min-height="140px"
				></textarea>
			</div>
		</FadeIn>

		<FadeIn delay={0.2}>
			<div class="growth-field">
				<h3 class="growth-label">Open questions</h3>
				<textarea
					value={profile.growth.questions}
					oninput={(e) =>
						profile.updateGrowth('questions', (e.target as HTMLTextAreaElement).value)}
					placeholder="What are you genuinely unsure about? What would change your mind?"
					class="textarea"
					style:min-height="140px"
				></textarea>
			</div>
		</FadeIn>
	</section>

	<!-- Part 5: Reference Library -->
	<section class="section">
		<FadeIn>
			<div class="part-label">Part 5</div>
			<h2 class="section-title">Reference Library</h2>
			<p class="section-desc">The talks, essays, and books that inform your positions.</p>
		</FadeIn>

		<FadeIn delay={0.1}>
			<textarea
				value={profile.references}
				oninput={(e) => (profile.references = (e.target as HTMLTextAreaElement).value)}
				placeholder="Your reference library..."
				class="textarea"
				style:min-height="200px"
			></textarea>
		</FadeIn>
	</section>

	<!-- Footer -->
	<footer>
		<div class="footer-version">Developer Cognition Profile v0.3</div>
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
		color: #777;
		margin-bottom: 16px;
		transition: opacity 1.2s ease 0.3s;
	}

	.hero-title {
		font-family: var(--serif);
		font-size: clamp(36px, 7vw, 72px);
		color: #f0f0f0;
		text-align: center;
		line-height: 1.1;
		margin: 0;
		transition: opacity 1.2s ease 0.6s;
	}

	.hero-count {
		font-family: var(--mono);
		font-size: 11px;
		color: #777;
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
		color: #777;
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
		gap: 12px;
		padding: 24px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		margin-bottom: 40px;
		position: sticky;
		top: 0;
		z-index: 10;
		background: linear-gradient(to bottom, #0a0a0b 80%, transparent);
	}

	.btn-secondary {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: transparent;
		color: #999;
	}

	.btn-primary {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		border: 1px solid rgba(91, 141, 239, 0.4);
		background: rgba(91, 141, 239, 0.08);
		color: #5b8def;
	}

	.section {
		padding-top: 80px;
		padding-bottom: 80px;
	}

	.section-shaded {
		background: rgba(255, 255, 255, 0.015);
		border-radius: 16px;
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
		color: #555;
		margin-bottom: 8px;
	}

	.section-title {
		font-family: var(--serif);
		font-size: clamp(28px, 4vw, 42px);
		color: #f0f0f0;
		margin: 0 0 12px;
		font-weight: normal;
	}

	.section-desc {
		font-family: var(--mono);
		font-size: 12px;
		color: #999;
		line-height: 1.7;
		margin: 0 0 40px;
		max-width: 660px;
	}

	.growth-field {
		margin-bottom: 32px;
	}

	.growth-label {
		font-family: var(--serif);
		font-size: clamp(18px, 2.5vw, 24px);
		color: #f0f0f0;
		margin: 0 0 8px;
		font-weight: normal;
	}

	.textarea {
		width: 100%;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		padding: 14px;
		color: #bbb;
		font-family: var(--mono);
		font-size: 12px;
		line-height: 1.7;
		resize: vertical;
		outline: none;
		display: block;
	}

	.textarea:focus {
		border-color: rgba(255, 255, 255, 0.2);
	}

	footer {
		padding: 40px 0 80px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		text-align: center;
	}

	.footer-version {
		font-family: var(--mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: #555;
		margin-bottom: 12px;
	}

	.footer-credit {
		font-family: var(--mono);
		font-size: 10px;
		color: #555;
	}

	.footer-motto {
		font-family: var(--mono);
		font-size: 10px;
		color: #555;
		font-style: italic;
		margin-top: 8px;
	}
</style>
