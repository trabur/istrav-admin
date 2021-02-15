
<script>
  import { onMount } from 'svelte';
  import View from '../../../../../../components/Apps/Collections/Products.svelte'
  import Navigation from '../../../../../../components/Header/Navigation.svelte'
  import MainLinks from '../../../../../../components/Header/MainLinks.svelte'

  import { stores } from "@sapper/app"
  const { page } = stores()

  // When this is true, show the component
  let load = false
  let domain
  let state
  let slug

  $: { reMount($page.params.domain) }
  $: { reMount($page.params.state) }
  $: { reMount($page.params.slug) }
  function reMount() {
    load = false
    setTimeout(() => load = true, 0)
    domain = $page.params.domain
    state = $page.params.state
    slug = $page.params.slug
  }

  onMount(() =>{
		// if not already logged in then direct to login
		if (!localStorage.getItem('token')) {
			window.location.href = '/'
		}
  })
</script>

<Navigation>
  <MainLinks domain={domain} state={state} />
</Navigation>
{#if load === true}
  <View domain={domain} state={state} slug={slug} />
{/if}
