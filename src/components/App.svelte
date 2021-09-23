<script>
	import { onMount } from 'svelte';
	import Recto from './Recto.svelte';
	import Verso from './Verso.svelte';
	import { COLORS } from '../constants';

	let suite = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946];
	let color = '#212121';
	let reversed = true;
	let pulsed = false;
	let loading = true;
	let fibonacci = 0;

	const setThemeColorMeta = content => document.querySelector('meta[name="theme-color"]').setAttribute('content', content);
	
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has('limit')) {
			const limit = urlParams.get('limit');
			suite = suite.filter(n => n <= limit);
			fibonacci = suite[suite.length - 1];
		}

		color = COLORS[Math.floor(Math.random() * COLORS.length)];

		setThemeColorMeta(color);

		setTimeout(() => {
			reversed = false;
		}, 1000);

		setTimeout(() => {
			pulsed = true;
			loading = false;
		}, 2 * 1000);
	});

	const askFibonacci = () => suite[Math.floor(Math.random() * suite.length)];

	const handleClick = () => {
		if (reversed) {
			reversed = false;

			setTimeout(() => {
				pulsed = true;
			}, 1000);
		} else {
			pulsed = false;

			setTimeout(() => {
				fibonacci = askFibonacci();
				reversed = true;
			}, 0.5 * 1000);
		}
	}
</script>

<div class="container" style={`background:${color};`}>
	<button class="card no-user-select" class:reverse={reversed} class:pulse={pulsed} on:click={handleClick} disabled={loading}>
		<Recto color={color} />
		<Verso color={color} value={fibonacci} />
	</button>
</div>

<style lang="scss">
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	perspective: 800px;

	.card {
		position: relative;
		width: 250px;
		height: 350px;
		border-radius: 0.5rem;
		transform-style: preserve-3d;
		transition: transform 0.75s ease-in-out;
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.25);
		cursor: pointer;

		&:focus {
			outline: none;
		}

		&.reverse {
			transform: rotateY(180deg);
		}

		&.pulse {
			animation: pulse 2s infinite;
		}
	}
}
</style>
