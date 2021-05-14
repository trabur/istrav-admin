<script>
  import { onMount } from 'svelte';

  import Delete from './Delete.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain
  export let state
  export let slugId = '';
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']

  let slug = slugId
  let appId
  let grantApplicationAccess
  let grantMarketing
  let grantShop
  let grantForum
  let grantChannel
  let grantPromo
  let grantHosting
  let grantWhiteLabel
  let endpoint

	async function change() {
    let token = localStorage.getItem('token')
    let change = {
      grantApplicationAccess,
      grantMarketing,
      grantShop,
      grantForum,
      grantChannel,
      grantPromo,
      grantHosting,
      grantWhiteLabel
    }
    let esUpdate = await scripts.subscription.plans.getUpdate(appId, token, slugId, change)
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

      // fetch plan
      let esPlan = await scripts.subscription.plans.getOne(appId, slug)
      console.log('esPlan', esPlan)
      if (esPlan.payload.success === true) {
        let data = esPlan.payload.data
        grantApplicationAccess = data.grantApplicationAccess
        grantMarketing = data.grantMarketing
        grantShop = data.grantShop
        grantForum = data.grantForum
        grantChannel = data.grantChannel
        grantPromo = data.grantPromo
        grantHosting = data.grantHosting
        grantWhiteLabel = data.grantWhiteLabel
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPlan.payload.reason)
      }
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
        <a href={`http://${endpoint}.tyu67.com/plans/${slugId}`} class="waves-effect btn right teal" style="margin-right: 1em;" target="_blank"><i class="navicon material-icons">public</i></a>
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="license-key-access" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">License Key Access</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12" style="margin-bottom: 0;">
          <h5 style="margin-bottom: 0;">On Demand Cloud</h5>
        </div>
        <div class="input-field col s12">
          <div>Application:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantApplicationAccess} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>

        {#if grantApplicationAccess}
          <div class="input-field col s12" style="margin-bottom: 0;">
            <h5 style="margin-bottom: 0;">App Permissions</h5>
          </div>
          <div class="input-field col s12">
            <div>Marketing:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantMarketing} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div>Shop:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantShop} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div>Forum:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantForum} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div>Channel:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantChannel} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div>Promo:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantPromo} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div>Hosting:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantHosting} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>

          <div class="input-field col s12" style="margin-bottom: 0;">
            <h5 style="margin-bottom: 0;">Remove Branding</h5>
          </div>
          <div class="input-field col s12">
            <div>White Label:</div>
            <div class="switch">
              <label>
                deny
                <!-- svelte-ignore M -->
                <input type="checkbox" bind:checked={grantWhiteLabel} on:change={() => setTimeout(() => M.updateTextFields(), 0)}>
                <span class="lever"></span>
                grant
              </label>
            </div>
          </div>
        {/if}
        
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
</style>