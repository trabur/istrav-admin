
<script>
  import { onMount } from 'svelte';
  import View from '../../../../components/Apps/Pages/View.svelte'
  import Navigation from '../../../../components/Header/Navigation.svelte'
  import MainLinks from '../../../../components/Header/MainLinks.svelte'
  import Footer from '../../../../components/Footer/Main.svelte'
  import Sidebar from '../../../../components/Sidebar.svelte'

  import { getStores, navigating, page, session } from '$app/stores';

  // When this is true, show the component
  let load = false
  let domain
  let state

  $: { reMount($page.params.domain) }
  $: { reMount($page.params.state) }
  function reMount(update) {
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

<Sidebar domain={domain} state={state} active="pages">
  <Navigation>
    <MainLinks domain={domain} state={state} />
  </Navigation>
  <div style="min-height: 100vh;">
    <br />
    <br />
    <br />
    {#if load === true}
      <View domain={domain} state={state}  />
    {/if}
    <br />
    <br />
    <br />
  </div>
  <Footer />
</Sidebar>