<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'
  
  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  import Browser from '../../Browser.svelte'

  import { views } from '../../views.js'
  import { wireframes } from '../../wireframes.js'
  
	export let domain = '';
  export let state = '';
  export let slugId = '';
  let M
  let Choices

  let app
  let page
  let name = ''
  let slug = slugId
  let appId
  let endpoint
  let wireframeId = ''
  let wireframeIdChoices

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    wireframeId = wireframeIdChoices.getValue(true)
    console.log('wireframeId', wireframeId)
    updateViewportComponent(wireframeId)

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      wireframe: wireframeId,
    }
    let esUpdate = await scripts.app.pages.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: /${slug}`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M = window['M']
    Choices = window['Choices']
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      app = esOne.payload.data
      appId = app.id
      endpoint = app.endpoint

      // fetch page
      let esPages = await scripts.app.pages.getOne(appId, slug)
      console.log('esPages', esPages)
      if (esPages.payload.success === true) {
        page = esPages.payload.data
        name = page.name
        slug = page.slug
        wireframeId = page.wireframe
        updateViewportComponent(wireframeId)
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPages.payload.reason)
      }

      // let esWireframes = await scripts.page.wireframes.getAll(appId)
      // console.log('esWireframes', esWireframes)
      // if (esWireframes.payload.success === true) {
      //   wireframes = esWireframes.payload.data
      // } else {
      //   alert(esWireframes.payload.reason)
      // }
      
      setTimeout(() => {
        const wireframeIdElement = document.querySelector('#wireframeId');
        wireframeIdChoices = new Choices(wireframeIdElement);
        wireframes.forEach((value, index) => {
          console.log(`${value.id} === ${wireframeId}`)
          if (value.id === wireframeId) {
            wireframes[index].selected = true
          }
          wireframes[index].value = value.id
          wireframes[index].label = value.name
        })
        console.log('wireframes', wireframes)
        wireframeIdChoices.setChoices(wireframes, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  // load wireframe component
	let viewportComponent = null
	function updateViewportComponent(wireframeId) {
		viewportComponent = views[wireframeId]
	}
</script>

<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="wireframe" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Wireframe</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">

        <div class="input-field col s12">
          {#if wireframes.length}
            <div class="label">Wireframe</div>
            <div class="choices">
              <select id="wireframeId" class="choices" bind:value={wireframeId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>

        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    <Browser url={"https://"}>
      <svelte:component this={viewportComponent} {app} {page} showWiring={true}>
        <!-- hello world -->
      </svelte:component>
    </Browser>
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

  .choices {
    position: absolute;
    right: 0.75em;
    left: 0.75em;
    z-index: 10;
  }
</style>