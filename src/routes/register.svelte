<svelte:head>
	<title>ADMIN ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
	import Register from '../components/Auth/Register.svelte'
	import Navigation from '../components/Header/Navigation.svelte'
	
	onMount(() => {
		// if already logged in then direct to main
		if (localStorage.getItem('token')) {
			window.location.href = '/apps'
		}
	})
</script>

<Navigation />
<br />
<br />
<br />
<Register />