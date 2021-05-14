<script>
  import { onMount, onDestroy } from 'svelte';
  // import { login, register } from './methods'
  import parseJwt from '../../helpers/parseJwt.js'

  let token
  let decoded
	let email = '';
  let password = '';
  let passwordRepeat = '';
  let username = '';
  let firstName = '';
  let lastName = '';
  let scripts = window['scripts']
  let M = window['M']

  onMount(async () => {
    M.updateTextFields();

    token = localStorage.getItem('token')
    decoded = parseJwt(token)
    console.log('decoded', decoded)

    let esOne = await scripts.tenant.members.getOne(decoded.email)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let member = esOne.payload.data
      console.log('member', member)
      email = decoded.email
      username = member.username
      firstName = member.firstName
      lastName = member.lastName
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

	async function submit() {
    if (email === '') return alert('Email must be defined.')
    if (username === '') return alert('Username must be defined.')
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')

    let change = {
      email,
      username,
      firstName,
      lastName
    }

    let getUpdate = await scripts.tenant.members.getUpdate(token, decoded.email, change)
    console.log('getUpdate', getUpdate)

    if (getUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: ${email}`})
    } else {
      alert(getUpdate.payload.reason)
    }
  }
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <br class="hide-on-med-and-down" />
    <br class="hide-on-med-and-down" />
    <br />
    <h3 class="title">MY PROFILE</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="text" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="username" type="text" class="validate" bind:value={username}>
          <label for="username">Username</label>
        </div>
        <div class="input-field col s6">
          <input id="firstName" type="text" class="validate" bind:value={firstName}>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="lastName" type="text" class="validate" bind:value={lastName}>
          <label for="lastName">Last Name</label>
        </div>
        <br />
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => submit()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href="/apps" class="waves-effect red lighten-2 btn">APPS</a>
    </div>
    <br class="hide-on-med-and-down" />
    <br class="hide-on-med-and-down" />
    <br />
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