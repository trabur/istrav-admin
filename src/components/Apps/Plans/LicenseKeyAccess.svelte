<script>
  import { onMount } from 'svelte';

  import Delete from './Delete.svelte'
  import SidebarPlans from '../../SidebarPlans.svelte'

	export let domain
  export let state
  export let slugId = '';

  let name = ''
  let slug = slugId
  let price
  let purchaseUrl
  let appId
  let grantMarketing
  let grantShop
  let grantForum
  let grantChannel
  let grantPromo
  let grantHosting
  let grantWhiteLabel
  let details
  let raw

  let purchaseId = ''
  let products = []
  let purchaseIdChoices

  function isValidJson(string) {
    try {
      JSON.parse(string)
    } catch (e) {
      return false
    }
    return true
  }

	async function change() {
    let token = localStorage.getItem('token')
    let change = {
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
      window.location = `/apps/${domain}/${state}/plans`
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
        purchaseUrl = data.purchaseUrl
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
  <div class="col s12 m2"></div>
  <div class="col s12 m3">
    <SidebarPlans domain={domain} state={state} slug={slug} />
  </div>
  <div class="col s12 m5">
    <h3 class="title">License Key Access</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12" style="margin-bottom: 0;">
          <h5 style="margin-bottom: 0;">App Permissions</h5>
        </div>
        <div class="input-field col s12">
          <div>Marketing:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantMarketing} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantShop} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantForum} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantChannel} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantPromo} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantHosting} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
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
              <input type="checkbox" bind:checked={grantWhiteLabel} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/plans`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
    </div>
  </div>
  <div class="col s12 m2"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>