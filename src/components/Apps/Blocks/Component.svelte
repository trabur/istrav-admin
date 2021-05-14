<script>
  import { onMount } from 'svelte';

  import components from './components.json'

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']

  let slug = slugId
  let appId
  let endpoint
  let componentId = ''
  let componentIdChoices

	async function change() {
    componentId = componentIdChoices.getValue(true)
    console.log('componentId', componentId)

    let token = localStorage.getItem('token')
    let change = {
      component: componentId
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
        componentId = data.component
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esBlock.payload.reason)
      }

      // fetch components
      // let esWireframes = await scripts.page.wireframes.getAll(appId)
      // console.log('esWireframes', esWireframes)
      // if (esWireframes.payload.success === true) {
      //   wireframes = esWireframes.payload.data
      // } else {
      //   alert(esWireframes.payload.reason)
      // }
      
      setTimeout(() => {
        const componentIdElement = document.querySelector('#componentId');
        componentIdChoices = new Choices(componentIdElement);
        components.forEach((value, index) => {
          console.log(`${value.id} === ${componentId}`)
          if (value.id === componentId) {
            components[index]['selected'] = true
          }
          components[index]['value'] = value.id
          components[index]['label'] = value.name
        })
        console.log('components', components)
        componentIdChoices.setChoices(components, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="component" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Component</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          {#if components.length}
            <div class="label">Component</div>
            <div class="choices">
              <select id="componentId" class="choices" bind:value={componentId}></select>
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