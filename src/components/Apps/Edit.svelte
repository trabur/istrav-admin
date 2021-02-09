<script>
  import { onMount } from 'svelte';
  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId
  let demo = ''

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      demo = app.demo
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')
    let change = {
      domain: domain,
      state: state,
      demo: demo
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
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">EDIT APP</h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <div class="row" style="margin-bottom: 0;">
        <div class="input-field col s12">
          <i class="material-icons prefix">store</i>
          <input id="domain" type="text" class="validate" bind:value={domain}>
          <label for="domain">Domain Name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">flag</i>
          <input id="state" type="text" class="validate" bind:value={state}>
          <label for="state">State</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">cloud</i>
          <input id="demo" type="text" class="validate" bind:value={demo}>
          <label for="demo">https://{demo}.demension.click</label>
        </div>
      </div>
    </div>
    <button class="waves-effect btn red lighten-2 right" on:click={() => submit()}>SAVE</button>
    <a href={`/apps/${domainId}/${stateId}`} class="waves-effect btn right" style="margin-right: 0.5em;">CANCEL</a>
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