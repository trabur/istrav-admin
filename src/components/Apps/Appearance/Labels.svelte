<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  import 'bytemd/dist/index.min.css';
  import { Editor, Viewer } from 'bytemd';
  import gfm from '@bytemd/plugin-gfm';

  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId
  let labelName
  let labelShort
  let labelEmail
  let labelSloganLine1
  let labelSloganLine2
  let labelWelcome
  let labelLocal
  let labelTollFree
  let labelAddressLine1
  let labelAddressLine2
  let labelPrimaryOffering

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      labelName = app.labelName
      labelShort = app.labelShort
      labelEmail = app.labelEmail
      labelAbout = app.labelAbout
      labelShipping = app.labelShipping
      labelSloganLine1 = app.labelSloganLine1
      labelSloganLine2 = app.labelSloganLine2
      labelWelcome = app.labelWelcome
      labelLocal = app.labelLocal
      labelTollFree = app.labelTollFree
      labelAddressLine1 = app.labelAddressLine1
      labelAddressLine2 = app.labelAddressLine2
      labelPrimaryOffering = app.labelPrimaryOffering
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')
    let change = {
      labelName,
      labelShort,
      labelEmail,
      labelAbout,
      labelShipping,
      labelSloganLine1,
      labelSloganLine2,
      labelWelcome,
      labelLocal,
      labelTollFree,
      labelAddressLine1,
      labelAddressLine2,
      labelPrimaryOffering
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      M.toast({html: `Successfuly updated labels: ${domainId} (${stateId})`})
    } else {
      alert(esUpdate.payload.reason)
    }
    loading = false
  }

  let labelAbout = ''
  const plugins = [
    gfm(),
    // Add more plugins here
  ];

  function handleAboutChange(e) {
    labelAbout = e.detail.value;
  }

  let labelShipping = ''
  function handleShippingChange(e) {
    labelShipping = e.detail.value;
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domainId} state={stateId} active="labels" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Labels</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="labelName" type="text" class="validate" bind:value={labelName}>
          <label for="labelName">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="labelShort" type="text" class="validate" bind:value={labelShort}>
          <label for="labelShort">Short</label>
        </div>
        <div class="input-field col s12">
          <input id="labelEmail" type="text" class="validate" bind:value={labelEmail}>
          <label for="labelEmail">Email</label>
        </div>

        <div class="input-field col s12">
          <input id="labelWelcome" type="text" class="validate" bind:value={labelWelcome}>
          <label for="labelWelcome">Welcome</label>
        </div>

        <div class="input-field col s12">
          <input id="labelSloganLine1" type="text" class="validate" bind:value={labelSloganLine1}>
          <label for="labelSloganLine1">Slogan Line 1</label>
        </div>
        <div class="input-field col s12">
          <input id="labelSloganLine2" type="text" class="validate" bind:value={labelSloganLine2}>
          <label for="labelSloganLine2">Slogan Line 2</label>
        </div>

        <div class="input-field col s12">
          <div>About:</div>
          <Editor value={labelAbout || ''} {plugins} on:change={handleAboutChange} />
        </div>

        <div class="input-field col s12">
          <div>Shipping:</div>
          <Editor value={labelShipping || ''} {plugins} on:change={handleShippingChange} />
        </div>

        <div class="input-field col s12">
          <input id="labelLocal" type="text" class="validate" bind:value={labelLocal}>
          <label for="labelLocal">Local</label>
        </div>
        <div class="input-field col s12">
          <input id="labelTollFree" type="text" class="validate" bind:value={labelTollFree}>
          <label for="labelTollFree">Toll Free</label>
        </div>

        <div class="input-field col s12">
          <input id="labelAddressLine1" type="text" class="validate" bind:value={labelAddressLine1}>
          <label for="labelAddressLine1">Address Line 1</label>
        </div>
        <div class="input-field col s12">
          <input id="labelAddressLine2" type="text" class="validate" bind:value={labelAddressLine2}>
          <label for="labelTolabelAddressLine2llFree">Address Line 2</label>
        </div>

        <div class="input-field col s12">
          <input id="labelPrimaryOffering" type="text" class="validate" bind:value={labelPrimaryOffering}>
          <label for="labelPrimaryOffering">Primary Offering</label>
        </div>
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