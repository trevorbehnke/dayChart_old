<script>
  import Chart from "./chart.svelte"
  import Clock from "./clock.svelte"
  import { todos } from './stores.js'
</script>

<div class=container>
  <div class="inner">
    <Chart todos={$todos}/>
  </div>
  <div class="inner">
    <Clock/>
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
    grid-template-areas: "inner-div";
  }

  .inner {
    /* height: 100px; */
    /* width: 100px; */
    /* important part */
    grid-area: inner-div;
  }
</style>