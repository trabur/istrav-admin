<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'
  
  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  
  export let domainId
  export let stateId
  let M

  let appId
  let loading = false
  let key = ''
  let token
  let hostId
  let hostDomain
  let hostState
  let hostPlan

  onMount(async () => {
    M = window['M']
    M.updateTextFields();

    token = localStorage.getItem('token')

    // load licenseKey from app
    let esOne = await scripts.tenant.apps.getOne(token, domainId, stateId)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      key = app.licenseKey
      appId = app.id
      setTimeout(() => M.updateTextFields(), 0)
      
      // then load licenseKey details
      appByKey() 
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true

    let change
    if (key) {
      let esLicense = await scripts.subscription.licenses.getOne(key)
      console.log('esLicense', esLicense)
      if (esLicense.payload.success === true) {
        let license = esLicense.payload.data
        console.log('license', license)
        change = {
          licenseKey: key,
          licenseId: license.id
        }
      } else {
        alert(esLicense.payload.reason)
      }
    } else {
      hostId = null
      hostDomain = null
      hostState = null
      hostPlan = null

      change = {
        licenseKey: null,
        licenseId: null
      }
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated subscription plan: ${domainId} (${stateId})`})
    } else {
      alert(esUpdate.payload.reason)
    }

    loading = false
  }

  async function appByKey () {
    if (key) {
      // fetch license
      let esLicense = await scripts.subscription.licenses.getOne(key)
      console.log('esLicense', esLicense)
      if (esLicense.payload.success === true) {
        let data = esLicense.payload.data
        key = data.key
        hostId = data.appId
        if (data.app) {
          hostDomain = data.app.domain
          hostState = data.app.state
          hostPlan = data.plan.slug
        }

        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esLicense.payload.reason)
      }
    } else {
      hostId = null
      hostDomain = null
      hostState = null
    }
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    {#if hostId}
      <Sidebar domain={domainId} state={stateId} hostId={hostId} active="change-subscription-plan" />
    {:else}
      <Sidebar domain={domainId} state={stateId} active="change-subscription-plan" />
    {/if}
  </div>
  <div class="col s12 m7">
    
    <h3 class="title">Change Subscription Plan</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        {#if hostId}
          <div class="input-field col s12">
            <h5>Host Id:</h5>
            <p>{hostId}</p>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">card_membership</i>
            <input id="hostPlan" type="text" class="validate" bind:value={hostPlan} disabled>
            <label for="hostPlan">host plan</label>
          </div>
        {:else}
          <div class="input-field col s12">
            Please enter a valid license key in order to continue.
          </div>
        {/if}
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
</style>