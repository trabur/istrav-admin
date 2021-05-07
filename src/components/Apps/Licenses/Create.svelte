
<script>
  import { onMount } from 'svelte';

	export let domain = '';
  export let state = '';

  let key = ''
  let appId

	async function create() {
    if (key === '') return alert('Key must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      key
    }
    let esSave = await scripts.subscription.licenses.getSave(appId, token, change)
    console.log('esSave', esSave)
    if (esSave.payload.success === true) {
      window.location = `/apps/${domain}/${state}/licenses/${key}`
    } else {
      alert(esSave.payload.reason)
    }
  }

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CREATE LICENSE</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="key" type="text" class="validate" bind:value={key}>
          <label for="key">Key</label>
        </div>
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => create()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href={`/apps/${domain}/${state}/licenses`} class="waves-effect red lighten-2 btn">Cancel</a>
    </div>
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