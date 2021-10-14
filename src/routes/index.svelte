<script>
	import Todos from '$lib/components/Todos.svelte';
	import { todos } from '../stores';
	import Graphic from '$lib/components/Graphic.svelte';
</script>

<div id="appContainer" class="grid grid-cols-1 md:grid-cols-2">
	<!-- Two-way binding of the writable store with Todos.svelte"-->
	<div class=" bg-yellow-200 mx-auto mb-6">
		<Todos bind:todos={$todos} />
	</div>

	<div class=" bg-red-200 mx-auto">
		<Graphic />
	</div>
</div>
