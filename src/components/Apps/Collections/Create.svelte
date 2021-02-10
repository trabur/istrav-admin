
<script>
  import { onMount } from 'svelte';

	export let domain = '';
  export let state = '';

  let name = ''
  let slug = ''
  
	async function create() {
    if (domain === '') return alert('Domain Name must be defined.')
    if (state === '') return alert('State must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      domain,
      state,
      demo
    }
    let esSave = await scripts.store.collections.getSave(token, change)
    console.log('esSave', esSave)
    if (esSave.payload.success === true) {
      window.location = `/apps/${domain}/${state}/collections`
    } else {
      alert(esSave.payload.reason)
    }
  }
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CREATE COLLECTION</h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => create()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href={`/apps/${domain}/${state}/collections`} class="waves-effect red lighten-2 btn">Cancel</a>
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