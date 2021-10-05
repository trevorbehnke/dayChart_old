<!-- components/Todo.svelte -->
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let todo

  // track editing mode to toggle todo display
  let editing = false   

  // track if edit button has been pressed, to give focus to it after cancel or save               
  let editButtonPressed = false           

  // temporarily hold the name of the todo being edited so that onCancel functions properly
  let name = todo.name                                    

  function update(updatedTodo) {
    // applies modifications to todo
    todo = { ...todo, ...updatedTodo }   
    // emit update event
    dispatch('update', todo)              
  }

  function onCancel() {
    // restores name to its initial value
    name = todo.name 
    // and exit editing mode         
    editing = false                      
  }

  function onSave() {
    // updates todo name
    update({ name: name })         
    // and exit editing mode       
    editing = false                       
  }

  function onEdit() {
    // when Cancel or Save is pressed, focus should go back to the Edit button
    editButtonPressed = true       
    // enter editing mode       
    editing = true                       
  }

  function onToggle() {
    // updates todo status
    update({ completed: !todo.completed}) 
  }

  const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus()

  const focusEditButton = (node) => editButtonPressed && node.focus()
</script>

<!-- Individual todo object-->
<div>
  <!-- Show this section if "editing" variable is true.  -->
  {#if editing}
  <form on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
    <div>
      <input bind:value={name} use:selectOnFocus use:focusOnInit type="text" id="todo-{todo.id}" autoComplete="off"/>
      <button on:click={onCancel} type="button">🛑</button>
      <button type="submit" disabled={!name}>➕</button>
    </div>
    </form>

  <!-- Show this section is "editing" variable is false. -->
  {:else}
    <div>
      <!-- Toggle the completed state -->
      <input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed}>
      <!-- Display todo name for corresponding id -->
      <label for="todo-{todo.id}" >{todo.name}</label>
      <button type="button" on:click={onEdit} use:focusEditButton>✏️</button>
      <!-- Emit the dispatch event and send the todo prop back up to the parent -->
      <button type="button" on:click="{() => dispatch('remove', todo)}">🗑</button>
    </div>
  {/if}
</div>