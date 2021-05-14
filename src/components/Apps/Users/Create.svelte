
<script>
  import { onMount } from 'svelte';

	export let domain = '';
  export let state = '';
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']

  let email
  let username
  let firstName
  let lastName
  let password
  let appId

	async function create() {
    if (!email) return alert('Email must be defined.')
    if (!username) return alert('Username must be defined.')
    if (!firstName) return alert('First Name must be defined.')
    if (!lastName) return alert('Last Name must be defined.')
    if (!password) return alert('Password must be defined.')

    let token = localStorage.getItem('token')
    let esSave = await scripts.account.users.getRegister(appId, email, username, password, firstName, lastName)
    console.log('esSave', esSave)
    if (esSave.payload.success === true) {
      window.location.href = `/apps/${domain}/${state}/users/${username}`
    } else {
      alert(esSave.payload.reason)
    }
  }

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CREATE USER</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="username" type="text" class="validate" bind:value={username}>
          <label for="username">Username</label>
        </div>
        <div class="input-field col s12">
          <input id="firstName" type="text" class="validate" bind:value={firstName}>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-field col s12">
          <input id="lastName" type="text" class="validate" bind:value={lastName}>
          <label for="lastName">Last Name</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value={password}>
          <label for="password">Password</label>
        </div>
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => create()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href={`/apps/${domain}/${state}/users`} class="waves-effect red lighten-2 btn">Cancel</a>
    </div>
  </div>
  <div class="col s12 m4"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>