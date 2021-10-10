<script>
	import { onMount } from 'svelte';
	let time = new Date();
	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
	let currentSeconds = hours * 60 * 60 + minutes * 60 + seconds;
	const totalSeconds = 86400;
	let ratio = (currentSeconds / totalSeconds).toFixed(4);
	// SVG variables
	let width = 300;
	// let viewBox = `0 0 ${width} ${width}`;
	let strokeWidth = 0.1 * width;
	let radius = width / 2 - strokeWidth / 2;
	let circumference = 2 * Math.PI * radius;
	let remaining = circumference * (1 - ratio);
	let cx = 0.5 * width;
	let cy = 0.5 * width;
</script>

<svg viewBox="-50 -50 100 100">
	<!-- <circle class='clock-face' r='48'/> -->
	<circle
		id="circle1"
		cx="${cx}"
		cy="${cy}"
		r="${radius}"
		fill="none"
		stroke="rgb(256, 256, 256)"
		stroke-width="${strokeWidth}"
	/>

	<circle
		id="circle2"
		cx="${cx}"
		cy="${cy}"
		r="${radius}"
		fill="none"
		stroke="rgb(78, 169, 255)"
		stroke-width="${strokeWidth}"
		stroke-dasharray="${circumference}"
		stroke-dashoffset="${remaining}"
	/>
	<!-- <g transform='rotate({15 * hours + minutes / 4})'>
  <line class='second' y1='10' y2='-38'/>
  <line class='second-counterweight' y1='10' y2='2'/>
</g> -->
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		transform: rotate(180deg);
	}
</style>
