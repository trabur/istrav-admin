<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'

  import components from './components.json'

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';
  let M
  let Choices

  let name = ''
  let slug = slugId
  let raw = ''
  let appId
  let endpoint
  let component
  let loadComponent
  let menuId = ''
  let menus = []
  let menuIdChoices
  let guideId = ''
  let guides = []
  let guideIdChoices

	async function change() {
    if (loadComponent.menu === true) {
      menuId = menuIdChoices.getValue(true)
      console.log('menuId', menuId)
    }
    if (loadComponent.guide === true) {
      guideId = guideIdChoices.getValue(true)
      console.log('guideId', guideId)
    }

    let token = localStorage.getItem('token')
    let change = {
      menuId,
      guideId
    }
    let esUpdate = await scripts.app.blocks.getUpdate(appId, token, slugId, change)
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
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint

      // fetch block
      let esBlock = await scripts.app.blocks.getOne(appId, slug)
      console.log('esBlock', esBlock)
      if (esBlock.payload.success === true) {
        let data = esBlock.payload.data
        name = data.name
        slug = data.slug
        raw = data.raw
        component = data.component
        loadComponent = components.filter((value) => {
          return value.id === component
        })[0]
        console.log('loadComponent', loadComponent)
        menuId = data.menuId
        guideId = data.guideId
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esBlock.payload.reason)
      }

      
      // fetch menus for dropdown
      if (loadComponent.menu === true) {
        let esMenus = await scripts.app.menus.getAll(appId)
        console.log('esMenus', esMenus)
        if (esMenus.payload.success === true) {
          menus = esMenus.payload.data
        } else {
          alert(esMenus.payload.reason)
        }
        
        setTimeout(() => {
          const menuIdElement = document.querySelector('#menuId');
          menuIdChoices = new Choices(menuIdElement);
          menus.forEach((value, index) => {
            console.log(`${value.id} === ${menuId}`)
            if (value.id === menuId) {
              menus[index].selected = true
            }
            menus[index].value = value.id
            menus[index].label = value.name
          })
          console.log('menus', menus)
          menuIdChoices.setChoices(menus, 'value', 'label', false)
        }, 0)
      }

      // fetch guides for dropdown
      if (loadComponent.guide === true) {
        let esGuides = await scripts.channel.guides.getAll(appId)
        console.log('esGuides', esGuides)
        if (esGuides.payload.success === true) {
          guides = esGuides.payload.data
        } else {
          alert(esGuides.payload.reason)
        }

        setTimeout(() => {
          const guideIdElement = document.querySelector('#guideId');
          guideIdChoices = new Choices(guideIdElement);
          guides.forEach((value, index) => {
            console.log(`${value.id} === ${guideId}`)
            if (value.id === guideId) {
              guides[index].selected = true
            }
            guides[index].value = value.id
            guides[index].label = value.name
          })
          console.log('guides', guides)
          guideIdChoices.setChoices(guides, 'value', 'label', false)
        }, 0)
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
    <Sidebar domain={domain} state={state} slug={slug} active="load-data" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Load Data</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        {#if loadComponent && loadComponent.menu === true}
          <div class="input-field col s12">
            <div class="label">Menu</div>
            <div class="choices">
              <select id="menuId" class="choices" bind:value={menuId}></select>
            </div>
            <br />
            <br />
          </div>
        {/if}
        {#if loadComponent && loadComponent.guide === true}
          <div class="input-field col s12">
            <div class="label">Guide</div>
            <div class="choices">
              <select id="guideId" class="choices" bind:value={guideId}></select>
            </div>
            <br />
            <br />
          </div>
        {/if}
        <button style="margin-left: 0.75em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
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