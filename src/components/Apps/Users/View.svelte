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
  let M

  let appId
  let endpoint
  let table = []
  let uploads

  onMount(async () => {
    M = window['M']
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint
      uploads = esOne.payload.data.uploads
      
      let esAll = await scripts.account.users.getAll(appId)
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
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/users</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card">
      <a href={`/apps/${domain}/${state}/users/add`} class="floating-add btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>
      <div class="list">
        {#if table.length}
          <Datatable settings={settings} data={table}>
            <thead>
              <tr>
                <th data-key="image">Image</th>
                <th data-key="username">Username</th>
                <th data-key="firstName">First Name</th>
                <th data-key="lastName">Last Name</th>
                <th data-key="id" style="text-align: right;">Change</th>
              </tr>
            </thead>

            <tbody>
              {#each $rows as row}
                <tr>
                  <td>
                    <img src={`${uploads}/${row.image}`} class="image" alt={row.image} />
                  </td>
                  <td>{row.username}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td style="text-align: right;"><a href={`/apps/${domain}/${state}/users/${row.username}`} class="btn  waves-effect waves-light"><i class="material-icons">edit</i></a></td>
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

  .list .image {
    height: 3em;
  }
</style>