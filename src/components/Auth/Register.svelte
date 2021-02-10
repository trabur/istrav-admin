<script>
  import { onMount, onDestroy } from 'svelte';
  // import { login, register } from './methods'

	let email = '';
  let password = '';
  let passwordRepeat = '';
  let username = '';
  let firstName = '';
  let lastName = '';

	async function auth() {
    if (email === '') return alert('Email must be defined.')
    if (password === '') return alert('Password must be defined.')
    if (passwordRepeat === '') return alert('Password repeat must be defined.')
    if (password !== passwordRepeat) return alert('Password should be the same as password confirm.')
    if (username === '') return alert('Username must be defined.')
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')
  
    let esRegister = await scripts.tenant.members.getRegister(email, username, password, firstName, lastName)
    console.log('esRegister', esRegister)
    if (esRegister.payload.success === true) {
      let esLogin = await scripts.tenant.members.getLogin(email, password)
      console.log('esLogin', esLogin)
      if (esLogin.payload.success === true) {
        localStorage.setItem('token', esLogin.payload.data.token)
        window.location = '/apps'
      } else {
        alert(esLogin.payload.reason)
      }
    } else {
      alert(esRegister.payload.reason)
    }
  }
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">REGISTER</h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="text" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value={password}>
          <label for="password">Password</label>
        </div>
        <div class="input-field col s12">
          <input id="passwordRepeat" type="password" class="validate" bind:value={passwordRepeat}>
          <label for="passwordRepeat">Password Confirm</label>
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
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => auth()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href="/" class="waves-effect red lighten-2 btn">LOGIN</a>
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