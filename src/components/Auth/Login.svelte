<script>
  // import { login } from './methods'

	let email = '';
  let password = '';

	async function auth() {
    if (email === '') return alert('Email must be defined.')
    if (password === '') return alert('Password must be defined.')

    let esLogin = await scripts.tenant.members.getLogin(email, password)
    console.log('esLogin', esLogin)
    if (esLogin.payload.success === true) {
      localStorage.setItem('token', esLogin.payload.data.token)
      window.location = '/apps'
    } else {
      alert(esLogin.payload.reason)
    }
  }
</script>

<div class="middle">
  <h3 class="title">LOGIN</h3>
  <div class="card" style="width: 100%; padding: 1em; background: #eee;">
    <div class="row">
      <div class="input-field col s12">
        <input id="email" type="text" class="validate" bind:value={email}>
        <label for="email">Email</label>
      </div>
      <div class="input-field col s12">
        <input id="password" type="password" class="validate" bind:value={password}>
        <label for="password">Password</label>
      </div>
      <br />
      <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => auth()}>Submit</button>
    </div>
  </div>
  <div style="text-align: right;">
    <a href="/register" class="waves-effect red lighten-2 btn">REGISTER</a>
  </div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }

  .middle {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateY(-50%) translateX(-50%);
    width: inherit;
    transform: translateY(-50%) translateX(-50%);
  }
</style>