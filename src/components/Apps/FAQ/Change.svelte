<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'
  
  import Sidebar from './Sidebar.svelte'
  import Delete from './Delete.svelte'

  // import 'bytemd/dist/index.min.css';
  // import { Editor, Viewer } from 'bytemd';
  // import gfm from '@bytemd/plugin-gfm';

	export let domain = '';
  export let state = '';
  export let slugId = '';
  let M

  let name = ''
  let slug = slugId
  let appId
  let endpoint
  let content
  var contentMD

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      content: contentMD.value()
    }
    let esUpdate = await scripts.app.faq.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: /${slug}`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M = window['M']
    contentMD = new window['SimpleMDE']({ element: document.getElementById("contentMD") })

    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint

      // fetch faq
      let esFAQ = await scripts.app.faq.getOne(appId, slug)
      console.log('esFAQ', esFAQ)
      if (esFAQ.payload.success === true) {
        let data = esFAQ.payload.data
        name = data.name // question
        slug = data.slug
        content = data.content // answer
        contentMD.value(content || '')
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esFAQ.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/faq</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}/faq`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/{slugId}</h3>
      <div style="text-align: right;">
        <Delete appId={appId} slug={slugId} domain={domain} state={state} />
        <a href={`http://${endpoint}.tyu67.com/faq/${slugId}`} class="waves-effect btn right teal" style="margin-right: 1em;" target="_blank"><i class="navicon material-icons">public</i></a>
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">FAQ</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Question</label>
        </div>
        <div class="input-field col s12">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>
        <div class="input-field col s12">
          <div>Answer:</div>
          <textarea id="contentMD" type="text" class="validate" bind:value={content}></textarea>
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .header {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .path {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    float: left;
    color: #555;
    line-height: 1.5em;
  }

  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>