<script>
  import { onMount } from 'svelte';

	import Navigation from '../../../components/Header/Navigation.svelte'
  import View from '../../../components/Apps/View.svelte'

  import { stores } from "@sapper/app"
  const { page } = stores()

  // When this is true, show the component
  let load = false

  $: { reMount($page.params.domain) }
  $: { reMount($page.params.state) }
  function reMount() {
    load = false
    setTimeout(() => load = true, 0)
  }
</script>

<Navigation />
<br />
<br />
{#if load === true}
  <View domain={$page.params.domain} state={$page.params.state} />
{/if}
