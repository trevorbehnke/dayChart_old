<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  // Get todos array from store
  import { todos } from './stores.js'
  import Chart from "./chart.svelte"
</script>

<div class="container">
  <!-- Two-way binding of the writable store with Todos.svelte"-->
  <div>
    <Todos bind:todos={$todos} />
  </div>
  
  <div>
    <Chart todos={$todos}/>
  </div>
  <!-- Pass the writable store to Chart as a prop -->
</div>

<style>
 .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}
</style>