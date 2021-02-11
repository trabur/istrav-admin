<script>
  // import { login } from './methods'
  import { onMount } from 'svelte';
  import moment from 'moment'
  import Create from './Create.svelte'
  import parseJwt from '../../helpers/parseJwt.js'

  let item
  let loading = true

  onMount(async () => {
    let token = localStorage.getItem('token')
    let decoded = parseJwt(token)
    console.log('decoded', decoded)

    let getOne = await scripts.tenant.members.getOne(decoded.email)
    console.log('getOne', getOne)
    if (getOne.payload.success === true) {
      console.log('item', getOne.payload.data)
      loading = false
      item = getOne.payload.data
    } else {
      alert(getOne.payload.reason)
    }
  })
</script>

<br />
<br />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <a class="waves-effect waves-light btn right modal-trigger" href="/edit" style="margin: 0;">EDIT</a>
      MY PROFILE:
    </h3>
    {#if loading}
      <div class="card" style="padding: 1em; background: #eee;">
        <p>loading...</p>
      </div>
    {:else}
      <div class="card" style="padding: 1em; background: #eee;">
        <h1><i class="material-icons">person</i> <a href={`/apps/${item.domain}/${item.state}`}>{item.username}</a></h1>
        <!-- <h1><span style="float: right;">version: {item.version}</span></h1> -->
        <hr>
        {JSON.stringify(item, null, 2)}
      </div>
    {/if}
  </div>
  <div class="col s12 m1"></div>
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