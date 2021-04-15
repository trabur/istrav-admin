<svelte:head>
	<title>ADMIN ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
	import Edit from '../components/Auth/Edit.svelte'
	import Navigation from '../components/Header/Navigation.svelte'
  import Footer from '../components/Footer.svelte'
</script>

<Navigation />
<div style="min-height: 100vh;">
	<br />
	<br />
	<br />
	<Edit />
	<br />
	<br />
	<br />
</div>
<Footer />