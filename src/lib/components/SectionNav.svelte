<script lang="ts">
	import { onMount } from 'svelte';

	interface Section {
		id: string;
		label: string;
		part: string;
	}

	const SECTIONS: Section[] = [
		{ id: 'section-compasses', label: 'Compasses', part: '1' },
		{ id: 'section-methodology', label: 'Methodology', part: '2' },
		{ id: 'section-cognitive', label: 'Cognitive', part: '3' },
		{ id: 'section-reference', label: 'Reference', part: '4' },
	];

	let activeId = $state<string | null>(null);
	let visible = $state(false);

	onMount(() => {
		// Delay mounting until scroll begins
		const showOnScroll = () => {
			visible = window.scrollY > window.innerHeight * 0.5;
		};
		window.addEventListener('scroll', showOnScroll, { passive: true });

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{
				rootMargin: '-40% 0px -50% 0px',
				threshold: 0,
			},
		);

		for (const section of SECTIONS) {
			const el = document.getElementById(section.id);
			if (el) observer.observe(el);
		}

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', showOnScroll);
		};
	});

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<nav class="section-nav" class:visible aria-label="Section navigation">
	{#each SECTIONS as section}
		<button
			class="nav-item"
			class:active={activeId === section.id}
			onclick={() => scrollTo(section.id)}
			aria-current={activeId === section.id ? 'true' : undefined}
		>
			<span class="nav-part">{section.part}</span>
			<span class="nav-label">{section.label}</span>
		</button>
	{/each}
</nav>

<style>
	.section-nav {
		position: fixed;
		left: 24px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 4px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s ease;
	}

	.section-nav.visible {
		opacity: 1;
		pointer-events: auto;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background 0.2s ease;
		text-align: left;
	}

	.nav-item:hover {
		background: var(--surface);
	}

	.nav-part {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--text-faint);
		width: 10px;
		flex-shrink: 0;
	}

	.nav-label {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--text-faint);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.nav-item.active .nav-part,
	.nav-item.active .nav-label {
		color: var(--text-secondary);
	}

	.nav-item.active .nav-label {
		color: var(--text);
	}

	/* Hide on narrow viewports — not enough room */
	@media (max-width: 900px) {
		.section-nav {
			display: none;
		}
	}
</style>
