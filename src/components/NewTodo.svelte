<!-- components/NewTodo.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let autofocus = false

  // Initialize "name" variable. This is bound to the input below. Value gets passed to addTodo function below.
  let name = ''

  // Initialize "name" variable. This is bound to the input below. Value gets passed to addTodo function below.
  let start = null

  // Initialize "name" variable. This is bound to the input below. Value gets passed to addTodo function below.
  let end = null

  // reference to the name input DOM node
  let nameEl                  

  const addTodo = () => {
    let newInfo = {name, start, end}
    // Dispatch the event. Name it "addTodo" and send "name" variable with it.
    dispatch('addTodo', newInfo )
    // Reset "name" variable to an empty string.
    name = ''
    // Reset "name" variable to an empty string.
    start = null
    // Reset "name" variable to an empty string.
    end = null
    // give focus to the name input
    nameEl.focus()            
  }

  const onCancel = () => {
    name = ''
    start = null
    end = null
    // give focus to the name input
    nameEl.focus()            
  }

  // if autofocus is true, we run nameEl.focus()
  onMount(() => autofocus && nameEl.focus())    
</script>

<!-- Submit new todo form | If escape key is pressed, input is reset via "onCancel" function-->
<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 >
    <label for="todo-0">Welcome to Day Chart!</label>
  </h2>
  <!-- Bind input to "name" variable above -->
  <input bind:value={name} bind:this={nameEl} use:selectOnFocus type="text" id="todo-0" autoComplete="off" maxlength="40"/>
  <!-- startTime input -->
  <input bind:value={start} type="time" id="todo-0" autoComplete="off"/>
  <!-- startTime input -->
  <input bind:value={end} type="time" id="todo-0" autoComplete="off"/>
  <button type="submit" disabled={!name || !start || !end}>➕</button>
</form>