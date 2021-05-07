<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  import Browser from '../../Browser.svelte'

  import SplashPage1 from '../../Wireframes/SplashPage1.svelte'
  import SplashPage2 from '../../Wireframes/SplashPage2.svelte'
  import MasterDetail1 from '../../Wireframes/MasterDetail1.svelte'

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
  let wireframeId
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
  
      // fetch page
      let esPages = await scripts.app.pages.getOne(appId, slug)
      console.log('esPages', esPages)
      if (esPages.payload.success === true) {
        let data = esPages.payload.data
        slug = data.slug
        wireframeId = data.wireframe
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPages.payload.reason)
      }

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
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    {#if wireframeId}
      <Browser url={"https://"}>
        {#if wireframeId === 'SplashPage1'}
          <SplashPage1 showWiring={true}>
            <span slot="logo">hello world</span>
          </SplashPage1>
        {/if}
        {#if wireframeId === 'SplashPage2'}
          <SplashPage2 showWiring={true}>
            <span slot="logo">hello world</span>
          </SplashPage2>
        {/if}
        {#if wireframeId === 'MasterDetail1'}
          <MasterDetail1 showWiring={true}>
            <span slot="logo">hello world</span>
          </MasterDetail1>
        {/if}
      </Browser>
    {/if}
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>