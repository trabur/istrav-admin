<script>
  import { onMount } from 'svelte';

  import {flip} from "svelte/animate";
  import {dndzone} from "svelte-dnd-action";

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  import Browser from '../../Browser.svelte'

  import SplashPage1 from '../../Wireframes/SplashPage1.svelte'
  import SplashPage2 from '../../Wireframes/SplashPage2.svelte'
  import MasterDetail1 from '../../Wireframes/MasterDetail1.svelte'
	const views = {
    SplashPage1,
    SplashPage2,
    MasterDetail1
  }

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
  let loading = true
  let wireframeId
  let slots
  let blocks = null
  let place = {
    logoSlot: [],
    sloganSlot: [],
    controlsSlot: [],
    navigationSlot: [],
    articleSlot: [],
    asideSlot: [],
    mainSlot: [],
    footerSlot: []
  }

	async function change() {
    let token = localStorage.getItem('token')

    let change = {
      slots: place
    }
    let esUpdate = await scripts.app.pages.getUpdate(appId, token, slug, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: /${slug}`})
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
        slots = data.slots
        updateViewportComponent(wireframeId)
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPages.payload.reason)
      }

      // fetch blocks that are already in page
      let esBlocks = await scripts.app.pages.getBlocks(appId, slug)
      console.log('esBlocks', esBlocks)
      if (esBlocks.payload.success === true) {
        blocks = esBlocks.payload.data
        fillSlots(slots)
      } else {
        alert(esBlocks.payload.reason)
      }

    } else {
      alert(esOne.payload.reason)
    }
  })

  // fill slots
  function fillSlots(slots) {
    if (!slots) return

    // pull from blocks and place into slots
    blocks.forEach((block) => {
      // does the block belong in any of the slots?
      ['logoSlot', 'sloganSlot', 'controlsSlot', 'navigationSlot', 'articleSlot', 'asideSlot', 'mainSlot', 'footerSlot'].forEach((id) => {
        let s = slots[id].find((slot) => {
          return slot.id === block.id
        })
        console.log('s', s)
        if (s) {
          // push to list
          place[id].push(s)
          // delete from blocks
          blocks = blocks.filter((b) => {
            return b.id !== block.id
          })
        }
      })
    })

    // need this to rerender page
    loading = false
  }

  // load wireframe component
	let viewportComponent = null
	function updateViewportComponent(wireframeId) {
		viewportComponent = views[wireframeId]
	}

  // dnd
  const flipDurationMs = 300;
  function handleDndConsider(e) {
    blocks = e.detail.items;
  }
  function handleDndFinalize(e) {
    blocks = e.detail.items;
    change()
  }
  function handleDndConsiderLogoSlot(e) {
    place.logoSlot = e.detail.items;
  }
  function handleDndFinalizeLogoSlot(e) {
    place.logoSlot = e.detail.items;
    change()
  }
  function handleDndConsiderSloganSlot(e) {
    place.sloganSlot = e.detail.items;
  }
  function handleDndFinalizeSloganSlot(e) {
    place.sloganSlot = e.detail.items;
    change()
  }
  function handleDndConsiderControlsSlot(e) {
    place.controlsSlot = e.detail.items;
  }
  function handleDndFinalizeControlsSlot(e) {
    place.controlsSlot = e.detail.items;
    change()
  }
  function handleDndConsiderNavigationSlot(e) {
    place.navigationSlot = e.detail.items;
  }
  function handleDndFinalizeNavigationSlot(e) {
    place.navigationSlot = e.detail.items;
    change()
  }
  function handleDndConsiderArticleSlot(e) {
    place.articleSlot = e.detail.items;
  }
  function handleDndFinalizeArticleSlot(e) {
    place.articleSlot = e.detail.items;
    change()
  }
  function handleDndConsiderAsideSlot(e) {
    place.asideSlot = e.detail.items;
  }
  function handleDndFinalizeAsideSlot(e) {
    place.asideSlot = e.detail.items;
    change()
  }
  function handleDndConsiderMainSlot(e) {
    place.mainSlot = e.detail.items;
  }
  function handleDndFinalizeMainSlot(e) {
    place.mainSlot = e.detail.items;
    change()
  }
  function handleDndConsiderFooterSlot(e) {
    place.footerSlot = e.detail.items;
  }
  function handleDndFinalizeFooterSlot(e) {
    place.footerSlot = e.detail.items;
    change()
  }
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
        {#if blocks !== null}
          <section class="slot" use:dndzone="{{items: blocks, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
            {#each blocks as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
        {/if}
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    {#if wireframeId && loading === false}
      <Browser url={"https://"}>
        <svelte:component this={viewportComponent} showWiring={true}>
          <section slot="logo" class="slot" use:dndzone="{{items: place.logoSlot, flipDurationMs}}" on:consider="{handleDndConsiderLogoSlot}" on:finalize="{handleDndFinalizeLogoSlot}">
            {#each place.logoSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="slogan" class="slot" use:dndzone="{{items: place.sloganSlot, flipDurationMs}}" on:consider="{handleDndConsiderSloganSlot}" on:finalize="{handleDndFinalizeSloganSlot}">
            {#each place.sloganSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="controls" class="slot" use:dndzone="{{items: place.controlsSlot, flipDurationMs}}" on:consider="{handleDndConsiderControlsSlot}" on:finalize="{handleDndFinalizeControlsSlot}">
            {#each place.controlsSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="navigation" class="slot" use:dndzone="{{items: place.navigationSlot, flipDurationMs}}" on:consider="{handleDndConsiderNavigationSlot}" on:finalize="{handleDndFinalizeNavigationSlot}">
            {#each place.navigationSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="article" class="slot" use:dndzone="{{items: place.articleSlot, flipDurationMs}}" on:consider="{handleDndConsiderArticleSlot}" on:finalize="{handleDndFinalizeArticleSlot}">
            {#each place.articleSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="aside" class="slot" use:dndzone="{{items: place.asideSlot, flipDurationMs}}" on:consider="{handleDndConsiderAsideSlot}" on:finalize="{handleDndFinalizeAsideSlot}">
            {#each place.asideSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="main" class="slot" use:dndzone="{{items: place.mainSlot, flipDurationMs}}" on:consider="{handleDndConsiderMainSlot}" on:finalize="{handleDndFinalizeMainSlot}">
            {#each place.mainSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
          <section slot="footer" class="slot" use:dndzone="{{items: place.footerSlot, flipDurationMs}}" on:consider="{handleDndConsiderFooterSlot}" on:finalize="{handleDndFinalizeFooterSlot}">
            {#each place.footerSlot as item(item.id)}
              <div class="block" animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
          </section>
        </svelte:component>
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

  .list {
    padding: 1em;
  }

  .slot {
    min-height: 80px;
    display: list-item;
    list-style: none;
    padding: 0.2em;
  }

  .block {
    border: 1px solid #333;
    padding: 0.2em;
  }

  .list .block {
    float: left;
  }
</style>