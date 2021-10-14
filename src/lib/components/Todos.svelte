<script>
	import Todo from './Todo.svelte';
	import MoreActions from './MoreActions.svelte';
	import NewTodo from './NewTodo.svelte';
	export let todos = [];
	// Create id for new item based on length of array.
	$: newTodoId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
	// Add todo to array. "name" parameter passed in from NewTodo.svelte.
	function addTodo({ name, start, end }) {
		// Create new todo object and add it todos array.
		todos = [...todos, { id: newTodoId, name, start, end, completed: false }];
	}
	// Remove todo from array
	function removeTodo(todo) {
		// Loop through todos array and return a new array where the new array contains items
		// that do not match the id of the argument.
		todos = todos.filter((t) => t.id !== todo.id);
	}
	function updateTodo(todo) {
		// Loop through the todos array and find the index number where the id is exactly equal
		// to the id of the argument.
		const i = todos.findIndex((t) => t.id === todo.id);
		// Copy the todo with index we just found into a new object, and update the object
		// with the todo argument we passed in.
		todos[i] = { ...todos[i], ...todo };
	}
	// Flip all todo items status.
	const checkAllTodos = (completed) => {
		// Map through each todo item, copy into a new array, and overwrite "completed" status.
		todos = todos.map((t) => ({ ...t, completed: completed }));
	};
	// Delete all completed todos by filtering items where "completed" is false into a new array.
	const removeCompletedTodos = () => {
		todos = todos.filter((t) => !t.completed);
	};
	// TODO: Toggle "Deselect All" back to "Select All" after "Delete Selected" is fired.
</script>

<!-- NewTodo -->
<!-- Get event dispatcher from NewTodo.svelte and run addTodo function, 
passing in the e.detail which in this case is the "name" variable -->
<NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

<!-- Todos -->
<div class=" ">
	<ul>
		{#each todos as todo (todo.id)}
			<li>
				<!-- Pass each todo as a prop to Todo.svelte | Receive two event dispatchers from Todo.svelte-->
				<Todo
					{todo}
					on:update={(e) => updateTodo(e.detail)}
					on:remove={(e) => removeTodo(e.detail)}
				/>
			</li>
		{:else}
			<li>Nothing to do I guess 🤷‍♂️!</li>
		{/each}
	</ul>
</div>

<!-- MoreActions -->
<!-- Passes todos array as a prop | Receives dispatch signals from "MoreActions.svelte" -->
<MoreActions
	{todos}
	on:checkAll={(e) => checkAllTodos(e.detail)}
	on:removeCompleted={removeCompletedTodos}
/>

<style>
</style>
