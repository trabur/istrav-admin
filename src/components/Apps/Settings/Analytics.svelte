<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  export let domain
  export let state  

  let googleAnalyticsMeasurementId

  onMount(async () => {
    M.updateTextFields();
    let token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(token, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      googleAnalyticsMeasurementId = app.googleAnalyticsMeasurementId
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    let token = localStorage.getItem('token')
    let change = {
      googleAnalyticsMeasurementId
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domain, state, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      window.location.href = `/apps/${app.domain}/${app.state}`
    } else {
      alert(esUpdate.payload.reason)
    }
  }
</script>

<Header domain={domain} state={state} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} active="analytics" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Analytics</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input id="googleAnalyticsMeasurementId" type="text" class="validate" bind:value={googleAnalyticsMeasurementId}>
          <label for="googleAnalyticsMeasurementId">googleAnalyticsMeasurementId</label>
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