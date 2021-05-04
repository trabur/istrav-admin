<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let video = ''
  let appId
  let uploads
  let token
  let loading = false
  let endpoint

	async function change() {

    let change = {
      video
    }
    let esUpdate = await scripts.channel.videos.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/videos/${slug}`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();
    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      uploads = esOne.payload.data.uploads
      endpoint = esOne.payload.data.endpoint

      // fetch video
      let esVideo = await scripts.channel.videos.getOne(appId, slug)
      console.log('esVideo', esVideo)
      if (esVideo.payload.success === true) {
        let data = esVideo.payload.data
        name = data.name
        slug = data.slug
        video = data.video
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esVideo.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })

	let preview
  let fileinput
  let files
	
	const onFileSelected = (e) => {
    let video = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(video)
    reader.onload = e => {
      preview = e.target.result
    }
  }

  function upload() {
    if (!preview) {
      return alert('Please select a file before doing that.')
    }
    loading = true

    const formData = new FormData()
    formData.append('appId', appId)
    formData.append('token', token)
    formData.append('folder', `watch/${slug}`)
    formData.append('sampleFile', files[0])

    fetch(`${window.backend}/v1/files/upload`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json()).then((result) => {
        console.log('Success:', result)
        loading = false
        // reset form
        files = null
        fileinput = null
        preview = null
        // update main
        video = result.payload.data.Key
      })
      .catch((error) => {
        console.error('Error:', error)
        loading = false
      })
  }
</script>

<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="watch" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Watch</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <button class="btn" on:click={(e)=>{e.preventDefault();fileinput.click();}}>Select Media</button>
        {#if loading === true}
          <button class="btn right disabled" on:click={upload}>UPLOAD</button>
        {:else}
          <button class="btn right" on:click={upload}>UPLOAD</button>
        {/if}
        <input type="file" name="sampleFile" style="display:none" accept="video/*" on:change={(e)=>onFileSelected(e)} bind:files bind:this={fileinput} >
        <br />
        <br />

        <div class="input-field col s12">
          <input id="video" type="text" class="validate" bind:value={video}>
          <label for="video">Video</label>
        </div>
        {#if video}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video controls style="width: 100%;">
            <source src={`${uploads}/${video}`}>
          </video>
          <p>{`${uploads}/${video}`}</p>
        {/if}

        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
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