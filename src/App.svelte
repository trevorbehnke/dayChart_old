<!-- App.svelte -->
<script>
  import Todos from './components/Todos.svelte'
  import { todos } from './stores.js'
</script>

<Todos bind:todos={$todos} />
