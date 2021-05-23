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
  let domain = ''
  let state = ''
  let token
  let key
  let hostId
  let hostDomain

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
      domain = app.domain
      state = app.state
      appId = app.id
      key = app.licenseKey
      setTimeout(() => M.updateTextFields(), 0)
      
      // then load licenseKey details
      appByKey() 
    } else {
      alert(esOne.payload.reason)
    }
  })

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
        }

        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esLicense.payload.reason)
      }
    } else {
      hostId = null
    }
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    {#if hostId}
      <Sidebar domain={domainId} state={stateId} hostId={hostId} active="domain-name" />
    {:else}
      <Sidebar domain={domainId} state={stateId} active="domain-name" />
    {/if}
  </div>
  <div class="col s12 m7">
    <h3 class="title">Domain Name</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <h5>Host Id:</h5>
          <p>{hostId}</p>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">store</i>
          <input id="domain" type="text" class="validate" bind:value={domain} disabled>
          <label for="domain">Domain Name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">flag</i>
          <input id="state" type="text" class="validate" bind:value={state} disabled>
          <label for="state">State</label>
        </div>
        <div style="padding: 0 1em;">Keep State set to "production" unless you know what you're doing. Make sure Domain Name is correct before moving on.</div>
        <a href={`/apps/${domainId}/${stateId}/settings`} style="margin-left: 1em;" class="waves-effect btn">Application Settings</a>
        <br />
        <br />
        <br />

        <div style="padding: 0 1em;">We use Route53 by AWS to transfer, register, and manage our domain names. Then we point each domain name's nameservers to Cloudflare for managing DNS records. These records then point to an IP where our servers are located.</div>
        <a href={`/apps/${domainId}/${stateId}/open-source/dns-records`} style="margin-left: 1em;" class="waves-effect btn">Point to servers</a>
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