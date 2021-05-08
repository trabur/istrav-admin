<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId
  let appId

  let playlistId = ''
  let playlists = []
  let playlistIdChoices

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      appId = app.id
      playlistId = app.channelId
      setTimeout(() => M.updateTextFields(), 0)

      // fetch playlists for dropdown
      let esPages = await scripts.channel.playlists.getAll(appId)
      console.log('esPages', esPages)
      if (esPages.payload.success === true) {
        playlists = esPages.payload.data
      } else {
        alert(esPages.payload.reason)
      }
      
      setTimeout(() => {
        const playlistIdElement = document.querySelector('#playlistId');
        playlistIdChoices = new Choices(playlistIdElement);
        playlists.forEach((value, index) => {
          console.log(`${value.id} === ${playlistId}`)
          if (value.id === playlistId) {
            playlists[index].selected = true
          }
          playlists[index].value = value.id
          playlists[index].label = value.name
        })
        console.log('playlists', playlists)
        playlistIdChoices.setChoices(playlists, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    playlistId = playlistIdChoices.getValue(true)
    console.log('playlistId', playlistId)

    loading = true
    let token = localStorage.getItem('token')
    let change = {
      channelId: playlistId
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated primary playlist: ${domainId} (${stateId})`})
    } else {
      alert(esUpdate.payload.reason)
    }
    loading = false
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domainId} state={stateId} active="primary-playlist" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Primary Playlist</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">

        <div class="input-field col s12">
          {#if playlists.length}
            <div class="label">Channel Landing Playlist</div>
            <div class="choices">
              <select id="playlistId" class="choices" bind:value={playlistId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>

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

  .choices {
    position: absolute;
    right: 0.75em;
    left: 0.75em;
    z-index: 10;
  }
</style>