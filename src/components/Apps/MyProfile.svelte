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

<h3 class="title">
  <a class="waves-effect waves-light btn right modal-trigger" href="/edit" style="margin: 0;">EDIT</a>
  MY PROFILE:
</h3>
{#if loading}
  <div class="card" style="padding: 1em;">
    <p>loading...</p>
  </div>
{:else}
  <div class="card" style="padding: 1em;">
    <h1><i class="material-icons">person</i> {item.username}</h1>
    <!-- <h1><span style="float: right;">version: {item.version}</span></h1> -->
    <hr>
    {JSON.stringify(item, null, 2)}
    <br />
    <br />
    <a href="/logout" class="waves-effect btn logout red lighten-2">LOG OUT</a>
  </div>
{/if}

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

  .logout {
    width: 100%;
  }
</style>