<svelte:head>
	<title>ADMIN ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
	import Register from '../components/Auth/Register.svelte'
	import Welcome from '../components/Auth/Welcome.svelte'
	
	onMount(() => {
		// if already logged in then direct to main
		if (localStorage.getItem('token')) {
			window.location.href = '/apps'
		}
	})
</script>

<div class="masonry row">
	<div class="col s12 m6 hide-on-small-and-down" style="padding-left: 0;">
		<Welcome />
	</div>
  <div class="col s12 m6">
		<Register />
	</div>
</div>

<style>
	.masonry {
		margin: 0;
	}
	.masonry .col {
    height: 100vh;
		position: relative;
	}
</style>