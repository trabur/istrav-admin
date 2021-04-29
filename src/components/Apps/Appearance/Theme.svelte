<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'

  export let domainId
  export let stateId
  let loading = false

  let domain = domainId
  let state = stateId
  
  let introBackColor
  let introTextColor
  let primaryBtnBackColor
  let primaryBtnTextColor
  let secondaryBtnBackColor
  let secondaryBtnTextColor


  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      introBackColor = app.introBackColor
      introTextColor = app.introTextColor
      primaryBtnBackColor = app.primaryBtnBackColor
      primaryBtnTextColor = app.primaryBtnTextColor
      secondaryBtnBackColor = app.secondaryBtnBackColor
      secondaryBtnTextColor = app.secondaryBtnTextColor
      setTimeout(() => M.updateTextFields(), 0)
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function submit() {
    loading = true
    let token = localStorage.getItem('token')
    let change = {
      introBackColor,
      introTextColor,
      primaryBtnBackColor,
      primaryBtnTextColor,
      secondaryBtnBackColor,
      secondaryBtnTextColor
    }
    let esUpdate = await scripts.tenant.apps.getUpdate(token, domainId, stateId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      let app = esUpdate.payload.data
      console.log('app', app)
      window.location.href = `/apps/${app.domain}/${app.state}`
    } else {
      alert(esUpdate.payload.reason)
    }
    loading = false
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domainId} state={stateId} active="" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Theme</h3>
    <div class="card" style="padding: 1em;">
      <p>Use the CSS selectors from <a href="https://materializecss.com/color.html" target="_blank" style="text-decoration: underline;">these available colors</a>; such as: "teal lighten-2" for using the color #4db6ac.</p>
      <hr>
      <div class="row">
        <div class="input-field col s12">
          <nav style={`background-color: ${introBackColor}`}>
            <div class="nav-wrapper">
              <a href="#/" class="brand-logo" style={`color: ${introTextColor};`}>Intro Example Colors</a>
            </div>
          </nav>
        </div>
        <div class="input-field col s12">
          <input id="introBackColor" type="text" class="validate" bind:value={introBackColor}>
          <label for="introBackColor">Intro Background Color</label>
        </div>
        <div class="input-field col s12">
          <input id="introTextColor" type="text" class="validate" bind:value={introTextColor}>
          <label for="introTextColor">Intro Text Color</label>
          <br />
          <br />
        </div>
        
        <div class="input-field col s12">
          <button class={`btn ${primaryBtnBackColor} ${primaryBtnTextColor}`}>Primary Button Example Colors</button>
        </div>
        <div class="input-field col s12">
          <input id="primaryBtnBackColor" type="text" class="validate" bind:value={primaryBtnBackColor}>
          <label for="primaryBtnBackColor">Primary Button Background Color</label>
        </div>
        <div class="input-field col s12">
          <input id="primaryBtnTextColor" type="text" class="validate" bind:value={primaryBtnTextColor}>
          <label for="primaryBtnTextColor">Primary Button Text Color</label>
          <br />
          <br />
        </div>


        <div class="input-field col s12">
          <button class={`btn ${secondaryBtnBackColor} ${secondaryBtnTextColor}`}>Secondary Button Example Colors</button>
        </div>
        <div class="input-field col s12">
          <input id="secondaryBtnBackColor" type="text" class="validate" bind:value={secondaryBtnBackColor}>
          <label for="secondaryBtnBackColor">Secondary Button Background Color</label>
        </div>
        <div class="input-field col s12">
          <input id="secondaryBtnTextColor" type="text" class="validate" bind:value={secondaryBtnTextColor}>
          <label for="secondaryBtnTextColor">Secondary Button Text Color</label>
          <br />
          <br />
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