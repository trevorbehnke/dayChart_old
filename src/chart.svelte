<canvas
  bind:this={canvas}
  id="myChart"
  width="400"
  height="400"
></canvas>

<script>
  import { afterUpdate } from 'svelte';

  export let todos = [];

  let canvas;
  let ctx;
  let theChart;
  const TOTAL_MIN = 1440;

  const create = (start, end, color) => {

    let splitStart = start.split(":");
    let splitEnd = end.split(":");
    let minStart = +splitStart[0] * 60 + +splitStart[1];
    let minEnd = +splitEnd[0] * 60 + +splitEnd[1];
    let radStart = (minStart / TOTAL_MIN) * 360 * (Math.PI / 180);
    let radEnd = (minEnd / TOTAL_MIN) * 360 * (Math.PI / 180);

    theChart = (a, b, c) => {
      ctx = canvas.getContext("2d")
      ctx.beginPath();
      ctx.arc(200, 200, 150, a, b);
      ctx.strokeStyle = c;
      ctx.lineWidth = 30;
      ctx.stroke();
    }

    theChart(radStart, radEnd, color)
  };

  afterUpdate(() => {
    if(theChart){theChart.destroy()};
    todos.forEach(({ start, end, color }) => {
    create(start, end, color);
      });
  });
</script>

<style>
	canvas {
    border: 1px solid #d3d3d3;
    transform: rotate(90deg);
	}
</style>