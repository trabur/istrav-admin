<svelte:head>
	<title>APPS ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte'
  import List from '../components/Apps/List.svelte'
  import Navigation from '../components/Header/Navigation.svelte'
  
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

<Navigation>
  <ul class="right">
    <li><a href="/logout"><i class="material-icons">logout</i></a></li>
  </ul>
</Navigation>
{#if display}
  <List />
{/if}