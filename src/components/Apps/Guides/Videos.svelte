<script>
  import { onMount } from 'svelte';

  export let domain
  export let state
  export let slug
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


<div class="row" style="min-height: 100vh;">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <a href={`/apps/${domain}/${state}/guides/${slug}`}><i class="material-icons">store</i> /guides/{slug}/videos</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card">
      <div class="list">
        {#if table.length}
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Slug</th>
                <th>Select</th>
              </tr>
            </thead>

            <tbody>
              {#each table as row (row.id)}
                <tr>
                  <td>
                    <img src={`https://rawcdn.githack.com/${uploads}/${domain}/${state}/videos/${row.slug}/${row.image}`} class="image" alt={row.image} />
                  </td>
                  <td><a href={`https://${endpoint}.burnfort.com/watch/${row.slug}`} target="_blank">/watch/{row.slug}</a></td>
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
          </table>
        {/if}
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>

<style>
  .title {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .list {
    margin: 0 1em;
  }
  
  .list .image {
    height: 3em;
  }
</style>