<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
		localStorage.removeItem('token')
		window.location.href = `/`
	})
</script>