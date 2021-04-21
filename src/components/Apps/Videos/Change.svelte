<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
  import Delete from './Delete.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let image
  let video = ''
  let appId
  let uploads
  let description
  let token
  let contentCreatorId = ''
  let users = []
  let contentCreatorIdChoices

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    
    let change = {
      name,
      slug,
      image,
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
    token = localStorage.getItem('token')

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
        image = data.image
        video = data.video
        description = data.description
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esVideo.payload.reason)
      }

      // fetch users for dropdown
      let esUsers = await scripts.account.users.getAll(appId)
      console.log('esUsers', esUsers)
      if (esUsers.payload.success === true) {
        users = esUsers.payload.data
      } else {
        alert(esUsers.payload.reason)
      }
      
      setTimeout(() => {
        const contentCreatorIdElement = document.querySelector('#contentCreatorId');
        contentCreatorIdChoices = new Choices(contentCreatorIdElement);
        users.forEach((value, index) => {
          console.log(`${value.id} === ${contentCreatorId}`)
          if (value.id === contentCreatorId) {
            users[index].selected = true
          }
          users[index].value = value.id
          users[index].label = value.username
        })
        console.log('users', users)
        contentCreatorIdChoices.setChoices(users, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

	let preview
  let fileinput
  let files
	
	const onFileSelected = (e) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      preview = e.target.result
    }
  }

  function upload() {
    if (!preview) {
      return alert('Please select a file before doing that.')
    }

    const formData = new FormData()
    formData.append('appId', appId)
    formData.append('token', token)
    formData.append('folder', `videos/${slug}`)
    formData.append('sampleFile', files[0])

    fetch('https://api.hacktracks.org/v1/files/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json()).then((result) => {
        console.log('Success:', result)
        // reset form
        files = null
        fileinput = null
        preview = null
        // update main
        image = result.payload.data.Key
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE VIDEO</h3>
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
          {#if users.length}
            <div class="label">Content Creator</div>
            <div class="choices">
              <select id="contentCreatorId" class="choices" bind:value={contentCreatorId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>

        {#if preview}
          <img class="preview" src="{preview}" alt="d" style="max-width: 100%;" />
        {/if}
        <button class="btn" on:click={(e)=>{e.preventDefault();fileinput.click();}}>Select Media</button>
        <button class="btn right" on:click={upload}>UPLOAD</button>
        <input type="file" name="sampleFile" style="display:none" on:change={(e)=>onFileSelected(e)} bind:files bind:this={fileinput} >
        <br />
        <br />

        <div class="input-field col s12">
          <input id="image" type="text" class="validate" bind:value={image}>
          <label for="image">Image</label>
        </div>
        <img src={`${uploads}/${image}`} alt="" style="width: 100%;" />
        <p>{`${uploads}/${image}`}</p>

        <a href={`/apps/${domain}/${state}/videos/${slug}/watch`} class="waves-effect btn btn-large" style="width: 100%;">GOTO VIDEO</a>

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

  .choices {
    position: absolute;
    right: 0.75em;
    left: 0.75em;
    z-index: 10;
  }

  .label {
    color: #9E9E99;
    font-size: 0.7em;
    margin-top: -1em;
  }
</style>