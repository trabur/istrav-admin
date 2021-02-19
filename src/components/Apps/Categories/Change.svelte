
<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
  import Delete from './Delete.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let image = ''
  let appId
  let uploads

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      image
    }
    let esUpdate = await scripts.store.categories.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/categories`
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
      uploads = esOne.payload.data.uploads

      let esCategory = await scripts.store.categories.getOne(appId, slug)
      console.log('esCategory', esCategory)
      if (esCategory.payload.success === true) {
        let data = esCategory.payload.data
        name = data.name
        slug = data.slug
        image = data.image
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esCategory.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE CATEGORY</h3>
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
          <input id="image" type="text" class="validate" bind:value={image}>
          <label for="image">Image</label>
        </div>
        <img src={`https://rawcdn.githack.com/${uploads}/${domain}/${state}/categories/${slugId}/${image}`} alt="" style="width: 100%;" />
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/categories`} class="waves-effect btn" style="margin-right: 0.5em;">cancel</a>
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