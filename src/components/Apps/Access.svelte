<script>
  import { onMount } from 'svelte';
  
  export let domainId
  export let stateId

  let appId
  let loading = false
  let key = ''

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domainId, stateId)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      key = app.licenseKey
      appId = app.id
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')

    let esLicense = await scripts.subscription.licenses.getOne(appId, key)
    console.log('esLicense', esLicense)
    if (esLicense.payload.success === true) {
      let license = esLicense.payload.data
      console.log('license', license)

      let change = {
        licenseKey: key,
        licenseId: license.id
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
    } else {
      alert(esLicense.payload.reason)
    }

    loading = false
  }
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">PAID ACCESS</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          Give your application more juice by signing up for one of our paid monthly subscription plans. Now available for sale in our storefront (<a href="https://shop.istrav.com">shop.istrav.com</a>). Once purchased go to your order history and copy/paste the given license key here. Leave empty to remain on the free plan.
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input id="key" type="text" class="validate" bind:value={key}>
          <label for="key">License Key</label>
        </div>
        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
      </div>
    </div>
    <a href={`/apps/${domainId}/${stateId}`} class="waves-effect btn right">CANCEL</a>
  </div>
  <div class="col s12 m4"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>