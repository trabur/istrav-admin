<script>
  import { onMount } from 'svelte';

  export let domainId
  export let stateId
  let appId
  let uploads
  let token

  // intro
  let image = "heic1901a.jpg"
  let line1 = "physical & digital"
  let line2 = "web services"
  let buttonName = "GET STARTED"
  let buttonUrl = "https://docs.istrav.com"

  onMount(async () => {
    M.updateTextFields();
    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domainId, stateId)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      uploads = app.uploads
      appId = app.id
      image = app.image
      line1 = app.line1
      line2 = app.line2
      buttonName = app.buttonName
      buttonUrl = app.buttonUrl
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    let token = localStorage.getItem('token')
    let change = {
      image,
      line1,
      line2,
      buttonName,
      buttonUrl
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated: ${domainId}`})
    } else {
      alert(esUpdate.payload.reason)
    }
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
    formData.append('folder', `intro`)
    formData.append('sampleFile', files[0])

    fetch(`${window.backend}/v1/files/upload`, {
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

<div class="banner">
  {#if uploads}
    <div class="image" style={`background-image: url(${uploads}/${image});`}>
      <div class="announce">
        <div class="hide-on-med-and-down">
          <span class="first"><h1 class="text">{line1}</h1></span><br />
          <span class="second"><h1 class="text" style="font-size: 2rem;">{line2}</h1></span>
        </div>
        <div class="hide-on-large-only">
          <span class="first"><h1 class="text small">{line1}</h1></span><br />
          <span class="second"><h1 class="text small" style="font-size: 1rem;">{line2}</h1></span>
        </div>
        <a href={`${buttonUrl}`} class="waves-effect waves-light btn-large" style="margin-top: 0.5em;">{buttonName}</a>
      </div>
    </div>
  {/if}
</div>

<br />
<br />
<br />
<div class="row" style="min-height: 100vh;">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">EDIT INTRO</h3>
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
          <label for="image">Image</label>
        </div>
        <img src={`${uploads}/${image}`} alt="" style="width: 100%;" />
        <p>{`${uploads}/${image}`}</p>

        <div class="input-field col s12">
          <input id="line1" type="text" class="validate" bind:value={line1}>
          <label for="line1">Line 1</label>
        </div>
        <div class="input-field col s12">
          <input id="line2" type="text" class="validate" bind:value={line2}>
          <label for="line2">Line 2</label>
        </div>
        <div class="input-field col s12">
          <input id="buttonName" type="text" class="validate" bind:value={buttonName}>
          <label for="buttonName">Button Name</label>
        </div>
        <div class="input-field col s12">
          <input id="buttonUrl" type="text" class="validate" bind:value={buttonUrl}>
          <label for="buttonUrl">Button Url</label>
        </div>
        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
      </div>
    </div>
    <a href={`/apps/${domainId}/${stateId}`} class="waves-effect btn right">CANCEL</a>
  </div>
  <div class="col s12 m4"></div>
</div>
<br />
<br />
<br />



<style>
  .image {
    width: 100%;
    height: 100vh;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: inset 0px 10px 10px -10px #000;
  }

  .banner {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }


  .announce {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .first,
  .second {
    background-color: #fff;
    display: inline-block;
    transform: skew(45deg);
    padding: 0.2em 4em;
    margin: 0.4em;
    text-transform: uppercase;
  }

  .text {
    transform: skew(-45deg);
    margin: 0;
    font-size: 4rem;
    font-weight: 900;
  }

  .small {
    font-size: 2rem;
    font-weight: 900;
  }

  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>