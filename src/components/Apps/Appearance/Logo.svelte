<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  export let domainId
  export let stateId
  let loading = false
  let scripts = window['scripts']
  let M = window['M']

  let domain = domainId
  let state = stateId
  let uploads
  let image
  let appId
  let token

  onMount(async () => {
    M.updateTextFields();

    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      image = app.logo
      uploads = app.uploads
      appId = app.id
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let change = {
      logo: image
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated logo: ${domainId} (${stateId})`})
    } else {
      alert(esUpdate.payload.reason)
    }
    loading = false
  }

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
    formData.append('folder', `logo`)
    formData.append('sampleFile', files[0])

    fetch(`${window['backend']}/v1/files/upload`, {
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
        setTimeout(() => M.updateTextFields(), 0)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domainId} state={stateId} active="logo" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Logo</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        
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
          <label for="image">Logo Image</label>
        </div>
        <img src={`${uploads}/${image}`} alt="" style="width: 100%;" />
        <p>{`${uploads}/${image}`}</p>

        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
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