<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  // Get todos array from store
  import { todos } from './stores.js'
  import Chart from "./chart.svelte"
</script>

<!-- Two-way binding of the writable store with Todos.svelte"-->
<Todos bind:todos={$todos} />

<!-- Pass the writable store to Chart as a prop -->
<Chart todos={$todos}/>