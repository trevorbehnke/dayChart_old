<script>
	import { onMount } from 'svelte';
	let time = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});

	let timeString = time.toLocaleString('en-us', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
	console.log(timeString);
</script>

<div>
	{timeString}
</div>
