<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		delay?: number;
		from?: 'below' | 'left';
		children: Snippet;
	}

	let { delay = 0, from = 'below', children }: Props = $props();

	let element: HTMLDivElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);
		observer.observe(element);
		return () => observer.disconnect();
	});

	const translateStart = $derived(
		from === 'left' ? 'translate(-30px, 0)' : 'translate(0, 30px)',
	);
</script>

<div
	bind:this={element}
	style:opacity={visible ? '1' : '0'}
	style:transform={visible ? 'translate(0,0)' : translateStart}
	style:transition="opacity 0.7s ease {delay}s, transform 0.7s ease {delay}s"
>
	{@render children()}
</div>
