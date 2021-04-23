<script>
  import { onMount } from 'svelte';

  import Delete from './Delete.svelte'

  import 'bytemd/dist/index.min.css';
  import { Editor, Viewer } from 'bytemd';
  import gfm from '@bytemd/plugin-gfm';

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let appId

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      content
    }
    let esUpdate = await scripts.app.pages.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/pages`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id

      // fetch page
      let esPages = await scripts.app.pages.getOne(appId, slug)
      console.log('esPages', esPages)
      if (esPages.payload.success === true) {
        let data = esPages.payload.data
        name = data.name
        slug = data.slug
        content = data.content
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPages.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })

  let content
  const plugins = [
    gfm(),
    // Add more plugins here
  ];

  function handleChange(e) {
    content = e.detail.value;
  }
</script>

<div class="row">
  <div class="col s12 m2"></div>
  <div class="col s12 m8">
    <h3 class="title">CHANGE PAGE</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>
        <div class="input-field col s12">
          <div>Content:</div>
          <Editor value={content} {plugins} on:change={handleChange} />
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/pages`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
    </div>
  </div>
  <div class="col s12 m2"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>