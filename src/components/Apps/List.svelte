<script>
  // import { login } from './methods'
  import { onMount } from 'svelte';
  // import moment from 'moment'

  let list = []
  let loading = true

  onMount(async () => {
    let token = localStorage.getItem('token')

    let esAll = await scripts.tenant.apps.getAll(token)
    console.log('esAll', esAll)
    if (esAll.payload.success === true) {
      console.log('apps', esAll.payload.data)
      loading = false
      list = esAll.payload.data
    } else {
      alert(esAll.payload.reason)
    }
  })
</script>

<div>
  <h3 class="title">
    <a class="waves-effect waves-light btn right modal-trigger" href="/create" style="margin: 0;">CREATE</a>
    APPLICATIONS:
  </h3>
  {#if loading}
    <div class="card" style="padding: 1em;">
      <p>loading...</p>
    </div>
  {:else}
    {#if list.length}
      {#each list as item (item.id)}
        <div class="card" style="padding: 1em;">
          <h1><i class="material-icons">store</i> <a href={`/apps/${item.domain}/${item.state}`}>{item.domain}</a> <span style="float: right;"><i class="material-icons">flag</i> {item.state}</span></h1>
          <!-- <h1><span style="float: right;">version: {item.version}</span></h1> -->
          <!-- <p>
            created at: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}<br />
            updated at: {moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
          </p> -->
          <hr>
          <code>{JSON.stringify(JSON.parse(item.raw), null, 2)}</code>
        </div>
      {/each}
    {:else}
      <div class="card" style="padding: 1em;">
        <p>get started by creating a new app!</p>
      </div>
    {/if}
  {/if}
</div>

<style>
  p {
    margin: 0;
  }

  h1 {
    margin: 0;
  }

  .title {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }
</style>