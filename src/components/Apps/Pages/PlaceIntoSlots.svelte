<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  import { Datatable, rows } from 'svelte-simple-datatables'

  const settings = { 
    columnFilter: true,
    rowPerPage: 15,
    scrollY: false,
    css: false // we use static/table.css instead
  }

  export let domain
  export let state
  export let slug

  let appId
  let endpoint
  let uploads
  let blocks = []

	async function change() {
    let token = localStorage.getItem('token')
    let change = {
      // blocks: blocks
    }
    let esUpdate = await scripts.app.pages.getUpdate(appId, token, slug, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: "${esUpdate.payload.data.name}"`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint
      uploads = esOne.payload.data.uploads
  
      // fetch blocks that are already in page
      let esBlocks = await scripts.app.pages.getBlocks(appId, slug)
      console.log('esBlocks', esBlocks)
      if (esBlocks.payload.success === true) {
        blocks = esBlocks.payload.data
      } else {
        alert(esBlocks.payload.reason)
      }

    } else {
      alert(esOne.payload.reason)
    }

  })
</script>


<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="place-into-slots" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Place Into Slots</h3>
    <div class="card">
      <div class="list">
        {#if blocks.length}
          {#each blocks as block}
            {block.name}
          {/each}
        {/if}
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>