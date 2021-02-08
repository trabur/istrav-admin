
<script>
  import { onMount } from 'svelte';
  import Edit from '../../../../components/Apps/Edit.svelte'
  import Navigation from '../../../../components/Header/Navigation.svelte'
  import MainLinks from '../../../../components/Header/MainLinks.svelte'

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
</script>

<Navigation>
  <MainLinks domain={domain} state={state} />
</Navigation>
<br />
<br />
{#if load === true}
  <Edit domainId={domain} stateId={state} />
{/if}
