<!-- components/Todo.svelte -->
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import { selectOnFocus } from '../actions.js'

  export let todo

  // track editing mode
  let editing = false      
  // track if edit button has been pressed, to give focus to it after cancel or save               
  let editButtonPressed = false           

  // hold the name of the todo being edited
  let name = todo.name                    
  let start = todo.start  
  let end = todo.end                  

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
    update({ name: name, start: start, end: end })         
    // and exit editing mode       
    editing = false                       
  }

  function onRemove() {
    // emit remove event
    dispatch('remove', todo)              
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

<div class="stack-small">
{#if editing}
  <form on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
    <div>
      <input bind:value={name} use:selectOnFocus use:focusOnInit type="text" id="todo-{todo.id}" autoComplete="off"/>
      <input bind:value={start} type="time" id="todo-{todo.id}" autoComplete="off" />
      <input bind:value={end}  type="time" id="todo-{todo.id}" autoComplete="off" />
      <button on:click={onCancel} type="button">Cancel</button>
      <button type="submit" disabled={!name}>Add</button>
    </div>
  </form>
{:else}
  <div>
    <input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed}>
    <label for="todo-{todo.id}" >{todo.name}</label>
    <input type="time" disabled="true" for="todo-{todo.start}" bind:value={todo.start}/>
    <input type="time" disabled="true" for="todo-{todo.end}"  bind:value={todo.end}/>
    <button type="button" on:click={onEdit} use:focusEditButton>Edit</button>
    <button type="button" on:click={onRemove}>Delete</button>
  </div>
{/if}
</div>