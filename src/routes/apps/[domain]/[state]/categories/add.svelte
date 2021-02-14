<svelte:head>
	<title>CREATE ::: ISTRAV</title>
</svelte:head>

<script>
  import { onMount } from 'svelte'
  import Create from '../../../../../components/Apps/Categories/Create.svelte'
  import Navigation from '../../../../../components/Header/Navigation.svelte'
  
  import { stores } from "@sapper/app"
  const { page } = stores()

  // When this is true, show the component
  let load = false
  let domain
  let state

  $: { reMount($page.params.domain) }
  $: { reMount($page.params.state) }
  function reMount() {
    load = false
    setTimeout(() => load = true, 0)
    domain = $page.params.domain
    state = $page.params.state
  }
  
  onMount(() =>{
		// if not already logged in then direct to login
		if (!localStorage.getItem('token')) {
			window.location.href = '/'
		}
  })
</script>

<Navigation />
<br />
<br />
<br />
{#if load}
  <Create domain={domain} state={state} />
{/if}