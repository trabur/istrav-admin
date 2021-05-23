<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  import { Datatable, rows } from 'svelte-simple-datatables'

  const settings = { 
    columnFilter: true,
    rowPerPage: 15,
    scrollY: false,
    css: false // we use static/table.css instead
  }

  export let domain
  export let state
  export let slug
  let M

  let appId
  let endpoint
  let uploads
  let table = []
  let videos = []

	async function change() {
    console.log(table)

    let videos = table.filter((value, index) => {
      return value.isSelected === true
    })

    let token = localStorage.getItem('token')
    let change = {
      videos: videos
    }
    let esUpdate = await scripts.channel.guides.getUpdate(appId, token, slug, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: "${esUpdate.payload.data.name}"`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M = window['M']
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint
      uploads = esOne.payload.data.uploads
      
      // fetch all videos
      let esAll = await scripts.channel.videos.getAll(appId)
      if (esAll.payload.success === true) {
        table = esAll.payload.data
      } else {
        alert(esAll.payload.reason)
      }

      // fetch videos that are already in collection
      let esVideos = await scripts.channel.guides.getVideos(appId, slug)
      console.log('esVideos', esVideos)
      if (esVideos.payload.success === true) {
        videos = esVideos.payload.data
      } else {
        alert(esVideos.payload.reason)
      }

      // mark them as checked
      videos.forEach((value, index) => {
        let i = table.findIndex((row, i) => {
          return row.id === value.id
        })
        console.log('i', i)

        if (i > -1) {
          table[i].isSelected = true
        }
      })

    } else {
      alert(esOne.payload.reason)
    }

  })
</script>


<Header {appId} {domain} {state} {endpoint} {slug} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="channel-videos" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Channel Videos</h3>
    <div class="card">
      <div class="list">
        {#if table.length}
          <Datatable settings={settings} data={table}>
            <thead>
              <tr>
                <th data-key="image">Image</th>
                <!-- <th>Name</th> -->
                <th data-key="slug">Slug</th>
                <th data-key="id">Select</th>
              </tr>
            </thead>

            <tbody>
              {#each $rows as row}
                <tr>
                  <td>
                    <img src={`${uploads}/${row.image}`} class="image" alt={row.image} />
                  </td>
                  <!-- <td>{row.name}</td> -->
                  <td><a href={`http://${endpoint}.burnfort.com/watch/${row.slug}`} target="_blank">/watch/{row.slug}</a></td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" on:change={() => setTimeout(change, 0)} bind:checked={row.isSelected} />
                        <span>{row.name}</span>
                      </label>
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </Datatable>
        {/if}
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
  
  .list .image {
    height: 3em;
  }
</style>