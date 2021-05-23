<script>
  import { onMount } from 'svelte';
  
  import { istrav, scripts } from '../../../../farmerless/api'

  import { Datatable, rows } from 'svelte-simple-datatables'

  const settings = { 
    columnFilter: true,
    rowPerPage: 15,
    scrollY: false,
    css: false // we use static/table.css instead
  }

  export let domain
  export let state

  let appId
  let endpoint
  let table = []
  let uploads

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint
      uploads = esOne.payload.data.uploads
      
      let esAll = await scripts.subscription.plans.getAll(appId)
      if (esAll.payload.success === true) {
        table = esAll.payload.data
      } else {
        alert(esAll.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/plans</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card">
      <a href={`/apps/${domain}/${state}/plans/add`} class="floating-add btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>
      <div class="list">
        {#if table.length}
          <Datatable settings={settings} data={table}>
            <thead>
              <tr>
                <th data-key="name">Name</th>
                <th data-key="slug">Slug</th>
                <th data-key="grantApplicationAccess">License Key</th>
                <th data-key="grantCollectionAccess">Collection</th>
                <th data-key="grantPlaylistAccess">Playlist</th>
                <th data-key="grantBulletinBoardAccess">Bulletin Board</th>
                <th data-key="grantHostingAccess">Hosting</th>
                <th data-key="id" style="text-align: right;">Change</th>
              </tr>
            </thead>

            <tbody>
              {#each $rows as row}
                <tr>
                  <td>{row.name}</td>
                  <td><a href={`https://${endpoint}.tyu67.com/plans/${row.slug}`} target="_blank">/plans/{row.slug}</a></td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" disabled bind:checked={row.grantApplicationAccess} />
                        <span></span>
                      </label>
                    </form>
                  </td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" disabled bind:checked={row.grantCollectionAccess} />
                        <span></span>
                      </label>
                    </form>
                  </td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" disabled bind:checked={row.grantPlaylistAccess} />
                        <span></span>
                      </label>
                    </form>
                  </td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" disabled bind:checked={row.grantBulletinBoardAccess} />
                        <span></span>
                      </label>
                    </form>
                  </td>
                  <td>
                    <form action="#">
                      <label>
                        <input type="checkbox" disabled bind:checked={row.grantHostingAccess} />
                        <span></span>
                      </label>
                    </form>
                  </td>
                  <td style="text-align: right;"><a href={`/apps/${domain}/${state}/plans/${row.slug}`} class="btn  waves-effect waves-light"><i class="material-icons">edit</i></a></td>
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
  .floating-add {
    position: fixed;
    right: 1em;
    bottom: 1em;
  }
  
  .title {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }
</style>