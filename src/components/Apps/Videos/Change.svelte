<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
  import Delete from './Delete.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let video = ''
  let appId
  let uploads
  let description

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      video,
      description
    }
    let esUpdate = await scripts.channel.videos.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/videos`
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

      // fetch video
      let esVideo = await scripts.channel.videos.getOne(appId, slug)
      console.log('esVideo', esVideo)
      if (esVideo.payload.success === true) {
        let data = esVideo.payload.data
        name = data.name
        slug = data.slug
        video = data.video
        description = data.description
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esVideo.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE VIDEO</h3>
    <div class="card" style="padding: 1em;">
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
          <input id="video" type="text" class="validate" bind:value={video}>
          <label for="video">Video</label>
        </div>
        <img src={`https://rawcdn.githack.com/${uploads}/${domain}/${state}/videos/${slug}/${video}`} alt="" style="width: 100%;" />
        <div class="input-field col s12">
          <textarea id="description" type="text" class="validate" bind:value={description}></textarea>
          <label for="description">Description</label>
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/videos`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
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
    min-height: 5em;
  }
</style>