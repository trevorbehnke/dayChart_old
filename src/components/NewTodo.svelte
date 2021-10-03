<!-- components/NewTodo.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let autofocus = false

  let name = ''
  let start = null
  let end = null
  // reference to the name input DOM node
  let nameEl                  

  const addTodo = () => {
    dispatch('addTodo', { name, start, end})
    name = ''
    start = null
    end = null
    // give focus to the name input
    nameEl.focus()            
  }

  const onCancel = () => {
    name = ''
    // give focus to the name input
    nameEl.focus()            
  }

  // if autofocus is true, we run nameEl.focus()
  onMount(() => autofocus && nameEl.focus())    

</script>

<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 >
    <label for="todo-0">Welcome to Day Chart!</label>
  </h2>
  <input bind:value={name} bind:this={nameEl} use:selectOnFocus type="text" id="todo-0" autoComplete="off"/>
  <input bind:value={start} type="time" id="start-0" autoComplete="off"/>
  <input bind:value={end} type="time" id="start-0" autoComplete="off"/>
  <button type="submit" disabled={!name}>Add</button>
</form>