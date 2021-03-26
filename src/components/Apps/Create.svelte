
<script>
  import { onMount } from 'svelte';

	let domain = '';
  let state = '';
  let endpoint = ''

	async function create() {
    if (domain === '') return alert('Domain Name must be defined.')
    if (state === '') return alert('State must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      domain,
      state,
      endpoint
    }
    let esSave = await scripts.tenant.apps.getSave(token, change)
    console.log('esSave', esSave)
    if (esSave.payload.success === true) {
      window.location = `/apps/${domain}/${state}`
    } else {
      alert(esSave.payload.reason)
    }
  }
</script>

<div class="row" style="min-height: 100vh;">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CREATE APP</h3>
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
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => create()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href="/apps" class="waves-effect red lighten-2 btn">APPS</a>
    </div>
  </div>
  <div class="col s12 m4"></div>
</div>
<br />
<br />
<br />

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>