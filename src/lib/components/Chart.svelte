<script>
	import { afterUpdate } from 'svelte';
	export let todos = [];
	let canvas;
	let ctx;
	let theChart;
	const TOTAL_MIN = 1440;
	const create = (start, end, color) => {
		let splitStart = start.split(':');
		let splitEnd = end.split(':');
		let minStart = +splitStart[0] * 60 + +splitStart[1];
		let minEnd = +splitEnd[0] * 60 + +splitEnd[1];
		let radStart = (minStart / TOTAL_MIN) * 360 * (Math.PI / 180);
		let radEnd = (minEnd / TOTAL_MIN) * 360 * (Math.PI / 180);
		theChart = (a, b, c) => {
			ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(170, 170, 150, a, b);
			ctx.strokeStyle = c;
			ctx.lineWidth = 20;
			ctx.stroke();
		};
		theChart(radStart, radEnd, color);
	};
	afterUpdate(() => {
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 340, 340);
		todos.forEach(({ start, end, color }) => {
			create(start, end, color);
		});
	});
</script>

<div>
	<canvas bind:this={canvas} id="myChart" width="340" height="340" />
</div>

<style>
	canvas {
		transform: rotate(90deg);
	}
</style>
