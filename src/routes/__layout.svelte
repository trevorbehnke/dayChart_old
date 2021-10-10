<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<div class="mx-auto flex flex-col flex-grow w-full max-w-7xl">
		<main class="flex flex-col w-full flex-grow py-4 px-4">
			<slot />
		</main>
		<Footer />
	</div>
</div>
