<script>
  import { onMount } from 'svelte';

  import Delete from './Delete.svelte'
  import SidebarPlans from '../../SidebarPlans.svelte'

	export let domain
  export let state
  export let slugId = '';

  let slug = slugId
  let appId
  let grantCollectionAccess
  
  let grantCollectionId = ''
  let collections = []
  let grantCollectionIdChoices

	async function change() {
    grantCollectionId = grantCollectionIdChoices.getValue(true)
    console.log('grantCollectionId', grantCollectionId)

    let token = localStorage.getItem('token')
    let change = {
      grantCollectionAccess,
      grantCollectionId
    }
    let esUpdate = await scripts.subscription.plans.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/plans/${slug}`
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

      // fetch plan
      let esPlan = await scripts.subscription.plans.getOne(appId, slug)
      console.log('esPlan', esPlan)
      if (esPlan.payload.success === true) {
        let data = esPlan.payload.data
        grantCollectionAccess = data.grantCollectionAccess

        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPlan.payload.reason)
      }

      // fetch collections for dropdown
      let esCollections = await scripts.store.collections.getAll(appId)
      console.log('esCollections', esCollections)
      if (esCollections.payload.success === true) {
        collections = esCollections.payload.data
      } else {
        alert(esCollections.payload.reason)
      }

      setTimeout(() => {
        const grantCollectionIdElement = document.querySelector('#grantCollectionId');
        grantCollectionIdChoices = new Choices(grantCollectionIdElement);
        collections.forEach((value, index) => {
          console.log(`${value.id} === ${grantCollectionId}`)
          if (value.id === grantCollectionId) {
            collections[index].selected = true
          }
          collections[index].value = value.id
          collections[index].label = value.name
        })
        console.log('collections', collections)
        grantCollectionIdChoices.setChoices(collections, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/plans</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}/plans`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/{slugId}</h3>
      <div style="text-align: right;">
        <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <SidebarPlans domain={domain} state={state} slug={slug} />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Collection Access</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12" style="margin-bottom: 0;">
          <h5 style="margin-bottom: 0;">On Demand Content</h5>
        </div>
        <div class="input-field col s12">
          <div>Collection:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantCollectionAccess} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>

        <div style={grantCollectionAccess ? 'display: visible;' : 'display: none;'}>
          <div class="input-field col s12" style="margin-bottom: 0;">
            <h5 style="margin-bottom: 0;">Exclusive Access</h5>
          </div>
          <div class="input-field col s12">
            {#if collections.length}
              <div class="label">Grant Permission To:</div>
              <div class="choices">
                <select id="grantCollectionId" class="choices" bind:value={grantCollectionId}></select>
              </div>
              <br />
              <br />
              <br />
            {/if}
          </div>
        </div>

        
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .header {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .path {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    float: left;
    color: #555;
    line-height: 1.5em;
  }

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