<svelte:head>
	<title>CREATE ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte'
  import Create from '../components/Apps/Create.svelte'
  import Navigation from '../components/Header/Navigation.svelte'
  import Footer from '../components/Footer.svelte'
  
  let display = false
  onMount(() =>{
    let loader = setInterval(() => {
      if (window.scripts) {
        display = true
        clearInterval(loader)
      }
    }, 100)

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
  {#if display}
    <Create />
  {/if}
	<br />
	<br />
	<br />
</div>
<Footer />