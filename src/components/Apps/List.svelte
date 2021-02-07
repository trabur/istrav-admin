<script>
  // import { login } from './methods'
  import { onMount } from 'svelte';
  import moment from 'moment'
  import Create from './Create.svelte'

  let list
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

<br />
<br />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <a class="waves-effect waves-light btn right modal-trigger" href="/create" style="margin: 0;">CREATE</a>
      APPLICATIONS:
    </h3>
    {#if loading}
      <div class="card" style="padding: 1em; background: #eee;">
        <p>loading...</p>
      </div>
    {:else}
      {#if list}
        {#each list as item (item.id)}
          <div class="card" style="padding: 1em; background: #eee;">
            <h1><i class="material-icons">star</i> <a href={`/apps/${item.domain}/${item.state}`}>{item.domain}</a> <span style="float: right;">state: {item.state}</span></h1>
            <!-- <h1><span style="float: right;">version: {item.version}</span></h1> -->
            <p>
              created at: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}<br />
              updated at: {moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <hr>
            {JSON.stringify(item, null, 2)}
          </div>
        {/each}
      {:else}
        <div class="card" style="padding: 1em; background: #eee;">
          <p>get started by creating a new app!</p>
        </div>
      {/if}
    {/if}
  </div>
  <div class="col s12 m1"></div>
</div>
<br />
<br />

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