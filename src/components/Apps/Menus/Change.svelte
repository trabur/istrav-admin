<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
  import Delete from './Delete.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let raw = ''
  let appId
  let categoryId = ''
  let categories = []
  let categoryIdChoices

  function isValidJson(string) {
    try {
      JSON.parse(string)
    } catch (e) {
      return false
    }
    return true
  }

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    if (!isValidJson(raw)) return alert('Raw must be valid JSON.')

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      raw
    }
    let esUpdate = await scripts.app.menus.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/menus`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id

      // fetch menu
      let esMenu = await scripts.app.menus.getOne(appId, slug)
      console.log('esMenu', esMenu)
      if (esMenu.payload.success === true) {
        let data = esMenu.payload.data
        name = data.name
        slug = data.slug
        raw = data.raw
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esMenu.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE MENU</h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name} on:change={() => slug = slugify(name)}>
          <label for="name">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>
        <div class="input-field col s12">
          <textarea id="raw" type="text" class="validate" bind:value={raw}></textarea>
          <label for="raw">Raw</label>
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/menus`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
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

  textarea {
    background: #fff;
    border: 1px solid #aaa;
    min-height: 10em;
  }
</style>