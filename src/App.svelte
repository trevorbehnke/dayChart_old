<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  // Get todos array from store
  import { todos } from './stores.js'

  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    // Total minutes in 1 day
    const TOTAL_MIN = 1440;

    // Function to convert object time to minutes and radians
    const convert = (start, end, color) => {
      let splitStart = start.split(":");
      let splitEnd = end.split(":");
      let minStart = +splitStart[0] * 60 + +splitStart[1];
      let minEnd = +splitEnd[0] * 60 + +splitEnd[1];
      let radStart = (minStart / TOTAL_MIN) * 360 * (Math.PI / 180);
      let radEnd = (minEnd / TOTAL_MIN) * 360 * (Math.PI / 180);
      return {
        minStart,
        minEnd,
        createArc: createArc(radStart, radEnd, color),
      };
    };

    // Function to create arc on canvas
    const createArc = (start, end, color) => {
      ctx.beginPath();
      ctx.arc(200, 200, 150, start, end);
      ctx.strokeStyle = color;
      ctx.lineWidth = 30;
      ctx.stroke();
    };
    $todos.forEach(({ start, end, color }) => {
    convert(start, end, color);
      });
  });

</script>

<!-- Pass the writable store as a prop to Todos.svelte & listen to changes with "$"-->
<Todos bind:todos={$todos} />

<canvas
  bind:this={canvas}
  width="400"
  height="400"
></canvas>

<style>
	canvas {
    border: 1px solid #d3d3d3;
    transform: rotate(90deg);
	}
</style>