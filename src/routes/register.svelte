<svelte:head>
	<title>METAHEAP: Get started by registering an account today!</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
	import Register from '../components/Auth/Register.svelte'
	import Welcome from '../components/Auth/Welcome.svelte'
	
  import GoogleAnalytics from '../components/Footer/GoogleAnalytics.svelte'

	onMount(() => {
		// if already logged in then direct to main
		if (localStorage.getItem('token')) {
			window.location.href = '/apps'
		}
	})
</script>

<div class="dotted">
	<div class="masonry row">
		<div class="col s12 m6 hide-on-small-and-down" style="padding-left: 0;">
			<Welcome />
		</div>
		<div class="col s12 m6">
			<Register />
		</div>
	</div>
</div>

<GoogleAnalytics measurementId='G-EVMYL6B45R' />

<style>
	.masonry {
		margin: 0;
	}
	.masonry .col {
    height: 100vh;
		position: relative;
	}
	
	.dotted {
		background-image: radial-gradient(#ddd 20%, transparent 20%), radial-gradient(#ddd 20%, transparent 20%);
    background-color: #eee;
    background-position: 0 0, 50px 50px;
    background-size: 100px 100px;
	}
</style>