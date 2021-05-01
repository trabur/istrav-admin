<svelte:head>
	<title>METAHEAP: Change my profile.</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
	import Edit from '../components/Auth/Edit.svelte'
	import Navigation from '../components/Header/Navigation.svelte'
  import Footer from '../components/Footer/Main.svelte'
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