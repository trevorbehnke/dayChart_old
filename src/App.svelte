<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  // Get todos array from store
  import { todos } from './stores.js'
</script>

<!-- Pass the writable store as a prop to Todos.svelte & listen to changes with "$"-->
<Todos bind:todos={$todos} />
