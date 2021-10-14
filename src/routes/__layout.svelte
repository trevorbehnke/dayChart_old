<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600">
	<Header />

	<div class="mx-auto flex flex-col flex-grow w-full max-w-7xl">
		<main class="flex flex-col w-full flex-grow py-4 px-4">
			<slot />
		</main>
		<Footer />
	</div>
</div>
