<script>
  import { onMount } from 'svelte';
  
  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  import 'bytemd/dist/index.min.css';
  import { Editor, Viewer } from 'bytemd';
  import gfm from '@bytemd/plugin-gfm';

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let appId
  let endpoint

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
      endpoint = esOne.payload.data.endpoint

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

  let content = ''
  const plugins = [
    gfm(),
    // Add more plugins here
  ];

  function handleChange(e) {
    content = e.detail.value;
  }
</script>

<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Page</h3>
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
          <Editor value={content || ''} {plugins} on:change={handleChange} />
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
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