<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  
  export let domain
  export let state  

  let isProduction
  let stripePublishableKeyTest
  let stripeSecretKeyTest
  let stripePublishableKeyLive
  let stripeSecretKeyLive

  onMount(async () => {
    M.updateTextFields();
    let token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(token, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      isProduction = !app.isStripeTestData
      stripePublishableKeyTest = app.stripePublishableKeyTest
      stripeSecretKeyTest = app.stripeSecretKeyTest
      stripePublishableKeyLive = app.stripePublishableKeyLive
      stripeSecretKeyLive = app.stripeSecretKeyLive
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    let token = localStorage.getItem('token')
    let change = {
      isStripeTestData: !isProduction,
      stripePublishableKeyTest,
      stripeSecretKeyTest,
      stripePublishableKeyLive,
      stripeSecretKeyLive
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domain, state, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated: ${domain}/${state}`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }
</script>

<Header domain={domain} state={state} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} active="payments" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Payments</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <div class="switch">
            <label>
              TEST
              <input type="checkbox" bind:checked={isProduction} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              LIVE
            </label>
          </div>
        </div>
        {#if isProduction}
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="stripePublishableKeyLive" type="text" class="validate" bind:value={stripePublishableKeyLive}>
            <label for="stripePublishableKeyLive">stripePublishableKeyLive</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="stripeSecretKeyLive" type="text" class="validate" bind:value={stripeSecretKeyLive}>
            <label for="stripeSecretKeyLive">stripeSecretKeyLive</label>
          </div>
        {:else}
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="stripePublishableKeyTest" type="text" class="validate" bind:value={stripePublishableKeyTest}>
            <label for="stripePublishableKeyTest">stripePublishableKeyTest</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="stripeSecretKeyTest" type="text" class="validate" bind:value={stripeSecretKeyTest}>
            <label for="stripeSecretKeyTest">stripeSecretKeyTest</label>
          </div>
        {/if}
        <button style="margin-left: 1em;" type="submit" class="waves-effect btn" on:click={() => submit()}>SUBMIT</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>