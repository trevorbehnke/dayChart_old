<script>
	import Chart from './Chart.svelte';
	import Clock from './Clock.svelte';
	import Compass from './Compass.svelte';
	import Progress from './Progress.svelte';
	import { todos } from '../../stores';
	import DigiClock from './DigiClock.svelte';
</script>

<div class="container min-h-full min-w-full py-4">
	<div class="inner" style="z-index:1">
		<Chart todos={$todos} />
	</div>
	<div class="inner" style="z-index:2">
		<Clock />
	</div>
	<div class="inner" style="z-index:3">
		<Compass />
	</div>
	<div class="inner" style="z-index:4">
		<DigiClock />
	</div>
</div>

<style>
	.container {
		/* width: 300px; */
		/* height: 300px; */
		/* margin: 0 auto; */
		/* background-color: yellow; */
		/* important part */
		display: grid;
		place-items: center;
		grid-template-areas: 'inner-div';
	}
	.inner {
		/* height: 100px; */
		/* width: 100px; */
		/* important part */
		grid-area: inner-div;
	}
</style>
