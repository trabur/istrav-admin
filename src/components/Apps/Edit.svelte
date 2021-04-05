<script>
  import { onMount } from 'svelte';
  import Delete from './Delete.svelte'
  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId
  let endpoint = ''
  let raw = ''
  let brands = ''
  let uploads = ''

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      endpoint = app.endpoint || ''
      raw = app.raw
      brands = app.brands
      uploads = app.uploads
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')
    let change = {
      domain,
      state,
      endpoint,
      raw,
      brands,
      uploads
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
    <div class="card" style="padding: 1em;">
      <div class="row">
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
          <input id="endpoint" type="text" class="validate" bind:value={endpoint}>
          <label for="endpoint">Endpoint</label>
        </div>
        <ul style="margin-left: 3.5em;">
          <li>https://{endpoint}.tyu67.com</li>
          <li>https://{endpoint}.dimension.click</li>
          <li>https://{endpoint}.burnfort.com</li>
          <li>https://{endpoint}.aaghc.com</li>
          <li>https://{endpoint}.printedbasics.com</li>
        </ul>
        <div class="input-field col s12">
          <i class="material-icons prefix">file_upload</i>
          <input id="uploads" type="text" class="validate" bind:value={uploads}>
          <label for="uploads">Uploads</label>
        </div>
        <div class="input-field col s12">
          <textarea id="raw" type="text" class="validate" bind:value={raw}></textarea>
          <label for="raw">Raw</label>
        </div>
        <div class="input-field col s12">
          <textarea id="brands" type="text" class="validate" bind:value={brands}></textarea>
          <label for="brands">Brands</label>
        </div>
        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
      </div>
    </div>
    <Delete domain={domain} state={state}/>
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

  textarea {
    background: #fff;
    border: 1px solid #aaa;
    min-height: 10em;
  }
</style>