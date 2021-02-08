<script>
  import { onMount } from 'svelte';
  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')
    let change = {
      domain: domain,
      state: state
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

  onMount(() => {
    M.updateTextFields();
  })
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
          <input id="state" type="tel" class="validate" bind:value={state}>
          <label for="state">State</label>
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