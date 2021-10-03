<!-- components/NewTodo.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let autofocus = false

  let name = ''
  let start = null
  let end = null
  let nameEl                  // reference to the name input DOM node

  const addTodo = () => {
    dispatch('addTodo', { name, start, end})
    name = ''
    start = null
    end = null
    nameEl.focus()            // give focus to the name input
  }

  const onCancel = () => {
    name = ''
    nameEl.focus()            // give focus to the name input
  }

  onMount(() => autofocus && nameEl.focus())    // if autofocus is true, we run nameEl.focus()

</script>

<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">Welcome to Day Chart!</label>
  </h2>
  <input bind:value={name} bind:this={nameEl} use:selectOnFocus 
    type="text" id="todo-0" autoComplete="off" class="input input__lg" 
  />
  <input bind:value={start} 
    type="time" id="start-0" autoComplete="off" class="input input__lg" 
  />
  <input bind:value={end} 
    type="time" id="start-0" autoComplete="off" class="input input__lg" 
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">+</button>
</form>