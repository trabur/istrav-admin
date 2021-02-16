<script>
  import { onMount } from 'svelte';

  export let domain
  export let state
  let appId
  let endpoint
  let table = []
  let uploads

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint
      uploads = esOne.payload.data.uploads
      
      let esAll = await scripts.store.products.getAll(appId)
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

<h3 class="title">
  <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/products</a>
  <div class="right">
    <i class="material-icons">flag</i> {state}
  </div>
</h3>

<a href={`/apps/${domain}/${state}/products/add`} class="floating-add btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>

<div class="list">
  {#if table.length}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Image</th>
          <th style="text-align: right;">Change</th>
        </tr>
      </thead>

      <tbody>
        {#each table as row (row.id)}
          <tr>
            <td>{row.name}</td>
            <td><a href={`https://${endpoint}.dimension.click/products/${row.slug}`} target="_blank">/products/{row.slug}</a></td>
            <td>
              <a href={`https://rawcdn.githack.com/${uploads}/${domain}/${state}/products/${row.slug}/${row.image}`} target="_blank">{row.image}</a>
            </td>
            <td style="text-align: right;"><a href={`/apps/${domain}/${state}/products/${row.slug}`} class="btn  waves-effect waves-light"><i class="material-icons">edit</i></a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .floating-add {
    position: fixed;
    right: 1em;
    bottom: 1em;
  }
  
  .title {
    padding: 0.5em; 
    font-size: 2rem;
    font-weight: 900;
    background: #333;
    box-shadow: inset 0px 10px 10px -10px #000;
    color: #eee;
    margin: 0;
  }

  .list {
    margin: 0 1em;
  }
</style>