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

  let pageId = ''
  let pages = []
  let pageIdChoices

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      appId = app.id
      pageId = app.marketingId
      setTimeout(() => M.updateTextFields(), 0)

      // fetch pages for dropdown
      let esPages = await scripts.app.pages.getAll(appId)
      console.log('esPages', esPages)
      if (esPages.payload.success === true) {
        pages = esPages.payload.data
      } else {
        alert(esPages.payload.reason)
      }
      
      setTimeout(() => {
        const pageIdElement = document.querySelector('#pageId');
        pageIdChoices = new Choices(pageIdElement);
        pages.forEach((value, index) => {
          console.log(`${value.id} === ${pageId}`)
          if (value.id === pageId) {
            pages[index].selected = true
          }
          pages[index].value = value.id
          pages[index].label = value.name
        })
        console.log('pages', pages)
        pageIdChoices.setChoices(pages, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    pageId = pageIdChoices.getValue(true)
    console.log('pageId', pageId)

    loading = true
    let token = localStorage.getItem('token')
    let change = {
      marketingId: pageId
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated primary page: ${domainId} (${stateId})`})
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
    <Sidebar domain={domainId} state={stateId} active="primary-page" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Primary Page</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">

        <div class="input-field col s12">
          {#if pages.length}
            <div class="label">Marketing Landing Page</div>
            <div class="choices">
              <select id="pageId" class="choices" bind:value={pageId}></select>
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