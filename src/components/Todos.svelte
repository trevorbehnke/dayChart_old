<!-- components/Todos.svelte -->
<script>
  import Todo from './Todo.svelte'
  import MoreActions from './MoreActions.svelte'
  import NewTodo from './NewTodo.svelte'

  export let todos = []

  // Create id for new item based on length of array.
  $: newTodoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1

  // Add todo to array. "name" parameter passed in from NewTodo.svelte.
  function addTodo( name ) {
    // Create new todo object and add it todos array.
    todos = [...todos, { id: newTodoId, name: name, completed: false }]
  }

  // Remove todo from array
  function removeTodo(todo) {
    // Loop through todos array and return new array where the new array contains items that do not match the id argument
    todos = todos.filter(t => t.id !== todo.id)
  }

  function updateTodo(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }

  let filter = 'all'
  const filterTodos = (filter, todos) => 
    filter === 'active' ? todos.filter(t => !t.completed) :
    filter === 'completed' ? todos.filter(t => t.completed) : 
    todos

  const checkAllTodos = (completed) => {
    todos = todos.map(t => ({...t, completed}))
  }
  const removeCompletedTodos = () => {
    todos = todos.filter(t => !t.completed)
  }

</script>

<!-- NewTodo -->
<!-- Get event dispatcher from NewTodo.svelte and run addTodo function, 
passing in the e.detail which in this case is the "name" variable -->
<NewTodo autofocus on:addTodo={e => addTodo(e.detail)} />

<!-- Todos -->
<div class="list-container">
  <ul>
    {#each filterTodos(filter, todos) as todo}
      <li >
        <Todo {todo}
          on:update={e => updateTodo(e.detail)}
          on:remove={e => removeTodo(e.detail)}
        />
      </li>
    {:else}
      <li>Nothing to do I guess 🤷‍♂️!</li>
    {/each}
  </ul>
</div>

<!-- MoreActions -->
<MoreActions {todos}
  on:checkAll={e => checkAllTodos(e.detail)}
  on:removeCompleted={removeCompletedTodos}
/>

<style>
  .list-container {
    margin: 20px auto;
  }
</style>