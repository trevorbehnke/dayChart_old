<!-- components/Todos.svelte -->
<script>
  import Todo from './Todo.svelte'
  import MoreActions from './MoreActions.svelte'
  import NewTodo from './NewTodo.svelte'
  import TodosStatus from './TodosStatus.svelte'

  export let todos = []

  // reference to TodosStatus instance
  let todosStatus                   

  $: newTodoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function addTodo({name, start, end}) {
    todos = [...todos, { id: newTodoId, name, start, end, completed: false }]
  }

  function removeTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
    // give focus to status heading
    todosStatus.focus()             
 
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

  <!-- TodosStatus -->
  <TodosStatus bind:this={todosStatus} {todos} />

  <!-- Todos -->
  <ul role="list" aria-labelledby="list-heading">
  {#each filterTodos(filter, todos) as todo (todo.id)}
    <li class="todo">
      <Todo {todo}
        on:update={e => updateTodo(e.detail)}
        on:remove={e => removeTodo(e.detail)}
      />
    </li>
  {:else}
    <li>Nothing to do here!</li>
  {/each}
  </ul>

  <!-- MoreActions -->
  <MoreActions {todos}
    on:checkAll={e => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />

</div>