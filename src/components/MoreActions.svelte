<!-- components/MoreActions.svelte -->
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let todos

  let completed = true

  const checkAll = () => {
    dispatch('checkAll', completed)
    completed = !completed
  }

  const removeCompleted = () => dispatch('removeCompleted')

  $: completedTodos = todos.filter(t => t.completed).length
</script>

<div>
  <button type="button" disabled={todos.length === 0} on:click={checkAll}>{completed ? 'Check' : 'Uncheck'} all</button>
  <button type="button" disabled={completedTodos === 0} on:click={removeCompleted}>Remove completed</button>
</div>