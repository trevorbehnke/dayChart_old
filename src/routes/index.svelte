<script>
	import Todos from '$lib/components/Todos.svelte';
	import { todos } from '../stores';
	import Graphic from '$lib/components/Graphic.svelte';
</script>

<div class="container">
	<!-- Two-way binding of the writable store with Todos.svelte"-->
	<div>
		<Todos bind:todos={$todos} />
	</div>

	<Graphic />
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}
</style>
