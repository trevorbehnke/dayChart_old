<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { selectOnFocus } from '../../actions.js';
	export let todo;
	let convertFrom24To12Format = (time24) => {
		const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
		const period = +sHours < 12 ? 'AM' : 'PM';
		const hours = +sHours % 12 || 12;
		return `${hours}:${minutes} ${period}`;
	};
	// track editing mode to toggle todo display
	let editing = false;
	// track if edit button has been pressed, to give focus to it after cancel or save
	let editButtonPressed = false;
	// temporarily hold the name of the todo being edited so that onCancel functions properly
	let name = todo.name;
	// temporarily hold the start of the todo being edited so that onCancel functions properly
	let start = todo.start;
	// temporarily hold the start of the todo being edited so that onCancel functions properly
	let end = todo.end;
	function update(updatedTodo) {
		// applies modifications to todo
		todo = { ...todo, ...updatedTodo };
		// emit update event
		dispatch('update', todo);
	}
	function onCancel() {
		// restores name to its initial value
		name = todo.name;
		// restores name to its initial value
		start = todo.start;
		// restores name to its initial value
		end = todo.end;
		// and exit editing mode
		editing = false;
	}
	function onSave() {
		// updates todo name
		update({ name: name, start: start, end: end });
		// and exit editing mode
		editing = false;
	}
	function onEdit() {
		// when Cancel or Save is pressed, focus should go back to the Edit button
		editButtonPressed = true;
		// enter editing mode
		editing = true;
	}
	function onToggle() {
		// updates todo status
		update({ completed: !todo.completed });
	}
	const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus();
	const focusEditButton = (node) => editButtonPressed && node.focus();
</script>

<!-- Individual todo object-->
<div>
	<!-- Show this section if "editing" variable is true.  -->
	{#if editing}
		<form on:submit|preventDefault={onSave} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
			<div>
				<input
					bind:value={name}
					use:selectOnFocus
					use:focusOnInit
					type="text"
					id="todo-{todo.id}"
					autoComplete="off"
					maxlength="40"
				/>
				<input bind:value={start} type="time" id="todo-{todo.id}" autoComplete="off" />
				<input bind:value={end} type="time" id="todo-{todo.id}" autoComplete="off" />
				<button on:click={onCancel} type="button">🛑</button>
				<button type="submit" disabled={!name || !start || !end}>➕</button>
			</div>
		</form>

		<!-- Show this section is "editing" variable is false. -->
	{:else}
		<div class="w-full flex">
			<!-- Toggle the completed state -->
			<div class=" w-1/12">
				<input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed} />
			</div>
			<!-- Display todo name for corresponding id -->
			<div class=" w-2/12">
				<label for="todo-{todo.id}">{todo.name}</label>
			</div>
			<div class=" w-3/12 text-right">
				<label for="todo-{todo.id}">{convertFrom24To12Format(start)}</label>
			</div>
			<div class=" w-1/12 text-center">
				<label for="todo-{todo.id}"> - </label>
			</div>
			<div class=" w-3/12 text-right">
				<label for="todo-{todo.id}">{convertFrom24To12Format(end)}</label>
			</div>
			<div class=" w-1/12 text-right">
				<button type="button" on:click={onEdit} use:focusEditButton>✏️</button>
			</div>
			<!-- Emit the dispatch event and send the todo prop back up to the parent -->
			<div class=" w-1/12 text-right">
				<button type="button" on:click={() => dispatch('remove', todo)}>🗑</button>
			</div>
		</div>
	{/if}
</div>

<style>
	/* label { */
	/* display: inline-block; */
	/* margin-right: 10px; */
	/* text-align: right; */
	/* width: 310px; */
	/* } */
</style>
