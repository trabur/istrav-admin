<script>
  import { onMount } from 'svelte';
  
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
      window.location.href = `/apps/${app.domain}/${app.state}`
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

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CLOUD ACCESS</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          Give your application more juice by signing up for one of our paid monthly subscription plans. Leave empty to remain on the free plan.
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input id="key" type="text" class="validate" bind:value={key} on:change={() => appByKey()}>
          <label for="key">License Key</label>
        </div>

        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
      </div>
    </div>
    <a href={`/apps/${domainId}/${stateId}`} class="waves-effect btn right">CANCEL</a>
  </div>
  <div class="col s12 m4"></div>
</div>

{#if hostId}
  <div class="row">
    <div class="col s12 m4"></div>
    <div class="col s12 m4">
      <h3 class="title">LICENSE KEY</h3>
      <div class="card" style="padding: 1em;">
        <div class="row">
          <div class="input-field col s12">
            <h5>Host Id:</h5>
            <p>{hostId}</p>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">store</i>
            <input id="hostDomain" type="text" class="validate" bind:value={hostDomain} disabled>
            <label for="hostDomain">host domain</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">flag</i>
            <input id="hostState" type="text" class="validate" bind:value={hostState} disabled>
            <label for="hostState">host state</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">card_membership</i>
            <input id="hostPlan" type="text" class="validate" bind:value={hostPlan} disabled>
            <label for="hostPlan">host plan</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12 m4"></div>
  </div>
{/if}

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>