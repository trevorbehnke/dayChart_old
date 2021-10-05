<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let todos

  let completed = true

  const checkAll = () => {
    dispatch('checkAll', completed)
    completed = !completed
  }

  // Listens to array to find out if there are any "completed" items and enables or disables the "Delete Selected" button accordingly...
  $: completedTodos = todos.filter(t => t.completed).length
</script>

<div>
  <!-- Button to Select / Deselect All | Disabled if array is empy | Fires "checkAll" function above-->
  <button type="button" disabled={todos.length === 0} on:click={checkAll}>{completed ? 'Select' : 'Deselect'} All</button>

  <!-- Button to delete selected items | Emits "removeCompleted" dispatcher  -->
  <button type="button" disabled={completedTodos === 0} on:click="{() => dispatch('removeCompleted')}">Delete Selected</button>
</div>