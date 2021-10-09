<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  import { todos } from './stores.js'
  import Graphic from './graphic.svelte';
</script>

<div class="container">
  <!-- Two-way binding of the writable store with Todos.svelte"-->
  <div>
    <Todos bind:todos={$todos} />
  </div>

  <Graphic/>
</div>

<style>
 .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}
</style>