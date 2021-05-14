<script>
  import { onMount } from 'svelte';
  
  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']

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
  let endpoint

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    contentCreatorId = contentCreatorIdChoices.getValue(true)
    console.log('contentCreatorId', contentCreatorId)

    let change = {
      name,
      slug,
      image,
      video,
      description,
      contentCreatorId
    }
    let esUpdate = await scripts.channel.videos.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: /${slug}`})
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
        image = data.image
        video = data.video
        description = data.description
        contentCreatorId = data.contentCreatorId
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

</script>

<Header domain={domain} state={state} appId={appId} endpoint={endpoint} slugId={slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="content-creator" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Content Creator</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
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