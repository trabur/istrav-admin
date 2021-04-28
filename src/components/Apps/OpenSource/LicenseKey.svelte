<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  
  export let domainId
  export let stateId

  let appId
  let loading = false
  let key = ''
  let token
  let hostId
  let hostDomain
  let hostState
  let hostPlan

  onMount(async () => {
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

  async function submit () {
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
      window.location.href = `/apps/${app.domain}/${app.state}/access/host-provider`
    } else {
      alert(esUpdate.payload.reason)
    }

    loading = false
  }

  async function appByKey () {
    hostId = null
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
    }
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    {#if hostId}
      <Sidebar domain={domainId} state={stateId} hostId={hostId} active="" />
    {:else}
      <Sidebar domain={domainId} state={stateId} active="" />
    {/if}
  </div>
  <div class="col s12 m7">
    <h3 class="title">License Key</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">

        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input id="key" type="text" class="validate" bind:value={key} on:change={() => appByKey()}>
          <label for="key">License Key</label>
        </div>
        <div class="input-field col s12" style="margin: 0 0 0.5em 0;">
          {#if hostId}
            The above is a valid license key (verified by host provider id: {hostId}).
          {:else}
            (The above is an unverified license key. Consider subscribing to one of our free plans so we can get the ball rolling.)
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
</style>