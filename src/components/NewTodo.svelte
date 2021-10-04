<!-- components/NewTodo.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let autofocus = false

  let name = ''
  // reference to the name input DOM node
  let nameEl                  

  const addTodo = () => {
    dispatch('addTodo', { name })
    name = ''
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
  <button type="submit" disabled={!name}>➕</button>
</form>