<!-- components/Todos.svelte -->
<script>
  import Todo from './Todo.svelte'
  import MoreActions from './MoreActions.svelte'
  import NewTodo from './NewTodo.svelte'

  export let todos = []

  $: newTodoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function addTodo({name, start, end}) {
    todos = [...todos, { id: newTodoId, name, start, end, completed: false }]
  }

  function removeTodo(todo) {
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

<div class="todoapp stack-large">

  <!-- NewTodo -->
  <NewTodo autofocus on:addTodo={e => addTodo(e.detail)} />

  <!-- Todos -->
  <ul role="list" aria-labelledby="list-heading">
  {#each filterTodos(filter, todos) as todo (todo.id)}
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

  <!-- MoreActions -->
  <MoreActions {todos}
    on:checkAll={e => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />

</div>