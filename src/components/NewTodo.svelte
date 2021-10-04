<!-- components/NewTodo.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let autofocus = false

  // Initialize "name" variable. This is bound to the input below. Value gets passed to addTodo function below.
  let name = ''

  // reference to the name input DOM node
  let nameEl                  

  const addTodo = () => {
    // Dispatch the event. Name it "addTodo" and send {name: name} with it.
    dispatch('addTodo', { name: name })
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

<!-- Submit new todo form -->
<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 >
    <label for="todo-0">Welcome to Day Chart!</label>
  </h2>
  <!-- Bind input to "name" variable above -->
  <input bind:value={name} bind:this={nameEl} use:selectOnFocus type="text" id="todo-0" autoComplete="off"/>
  <button type="submit" disabled={!name}>➕</button>
</form>