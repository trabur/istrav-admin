
<script>
  import { onMount } from 'svelte';
  import Edit from '../../../../components/Apps/Edit.svelte'
  import Navigation from '../../../../components/Header/Navigation.svelte'

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
  <ul class="right">
    <li><a href={`/apps/${domain}/${state}/featured`}><i class="material-icons">star</i></a></li>
    <li><a href={`/apps/${domain}/${state}/categories`}><i class="material-icons">widgets</i></a></li>
    <li><a href={`/apps/${domain}/${state}/products`}><i class="material-icons">shopping_basket</i></a></li>
  </ul>
</Navigation>
<br />
<br />
{#if load === true}
  <Edit domainId={domain} stateId={state} />
{/if}
