<svelte:head>
	<title>METAHEAP: Create a new application.</title>
</svelte:head>

<script>
  import { onMount } from 'svelte'
  import Create from '../components/Apps/Create.svelte'
  import Navigation from '../components/Header/Navigation.svelte'
  import Footer from '../components/Footer/Main.svelte'
  
  onMount(() =>{
		// if not already logged in then direct to login
		if (!localStorage.getItem('token')) {
			window.location.href = '/'
		}
  })
</script>

<Navigation />
<div style="min-height: 100vh;">
	<br />
	<br />
	<br />
  <Create />
	<br />
	<br />
	<br />
</div>
<Footer />