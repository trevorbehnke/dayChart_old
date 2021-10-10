<script>
	import Chart from './Chart.svelte';
	import Clock from './Clock.svelte';
	import Progress from './Progress.svelte';
	import { todos } from '../../stores';
</script>

<div class="container">
	<div class="inner" style="z-index:1">
		<Chart todos={$todos} />
	</div>
	<div class="inner" style="z-index:2">
		<Clock />
	</div>
	<!-- <div class="inner" style="z-index:3">
    <Progress/>
  </div> -->
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
