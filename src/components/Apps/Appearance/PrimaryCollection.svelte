<script>
  import { onMount } from 'svelte';

  import { istrav, scripts } from '../../../../farmerless/api'
  
  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  export let domainId
  export let stateId
  let loading = false
  let M
  let Choices

  let domain = domainId
  let state = stateId
  let appId

  let collectionId = ''
  let collections = []
  let collectionIdChoices

  onMount(async () => {
    M = window['M']
    Choices = window['Choices']
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      appId = app.id
      collectionId = app.shopId
      setTimeout(() => M.updateTextFields(), 0)

      // fetch collections for dropdown
      let esCollections = await scripts.store.collections.getAll(appId)
      console.log('esCollections', esCollections)
      if (esCollections.payload.success === true) {
        collections = esCollections.payload.data
      } else {
        alert(esCollections.payload.reason)
      }
      
      setTimeout(() => {
        const collectionIdElement = document.querySelector('#collectionId');
        collectionIdChoices = new Choices(collectionIdElement);
        collections.forEach((value, index) => {
          console.log(`${value.id} === ${collectionId}`)
          if (value.id === collectionId) {
            collections[index].selected = true
          }
          collections[index].value = value.id
          collections[index].label = value.name
        })
        console.log('collections', collections)
        collectionIdChoices.setChoices(collections, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    collectionId = collectionIdChoices.getValue(true)
    console.log('collectionId', collectionId)

    loading = true
    let token = localStorage.getItem('token')
    let change = {
      shopId: collectionId
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated primary collection: ${domainId} (${stateId})`})
    } else {
      alert(esUpdate.payload.reason)
    }
    loading = false
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domainId} state={stateId} active="primary-collection" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Primary Collection</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">

        <div class="input-field col s12">
          {#if collections.length}
            <div class="label">Storefront Landing Collection</div>
            <div class="choices">
              <select id="collectionId" class="choices" bind:value={collectionId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>

        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
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