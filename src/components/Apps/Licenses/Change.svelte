<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
  import Delete from './Delete.svelte'

	export let domain
  export let state
  export let slugId

  let key = ''
  let appId
  let planId = ''
  let plans = []
  let planIdChoices
  let registerId
  let registerDomain
  let registerState
  let token

	async function change() {
    if (key === '') return alert('Name must be defined.')
    planId = planIdChoices.getValue(true)
    console.log('planId', planId)

    let token = localStorage.getItem('token')
    let change = {
      key,
      planId,
      registerId,
    }
    let esUpdate = await scripts.subscription.licenses.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/licenses`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  async function findAppId () {
    if (!registerDomain && !registerState) {
      return registerId = null
    }

    let getOne = await scripts.tenant.apps.getOne(token, registerDomain, registerState)
    console.log('getOne', getOne)
    if (getOne.payload.success === true) {
      registerId = getOne.payload.data.id
    } else {
      alert(getOne.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();

    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id

      // fetch license
      let esLicense = await scripts.subscription.licenses.getOne(appId, slugId)
      console.log('esLicense', esLicense)
      if (esLicense.payload.success === true) {
        let data = esLicense.payload.data
        key = data.key
        planId = data.planId
        if (data.register) {
          registerId = data.register.id
          registerDomain = data.register.domain
          registerState = data.register.state
        }

        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esLicense.payload.reason)
      }

      // fetch plans for dropdown
      let esPlans = await scripts.subscription.plans.getAll(appId)
      console.log('esPlans', esPlans)
      if (esPlans.payload.success === true) {
        plans = esPlans.payload.data
      } else {
        alert(esPlans.payload.reason)
      }
      
      setTimeout(() => {
        const planIdElement = document.querySelector('#planId');
        planIdChoices = new Choices(planIdElement);
        plans.forEach((value, index) => {
          console.log(`${value.id} === ${planId}`)
          if (value.id === planId) {
            plans[index].selected = true
          }
          plans[index].value = value.id
          plans[index].label = value.name
        })
        console.log('plans', plans)
        planIdChoices.setChoices(plans, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE LICENSE</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="key" type="text" class="validate" bind:value={key}>
          <label for="key">Key</label>
        </div>

        <div class="input-field col s12">
          {#if plans.length}
            <div class="label">Plan</div>
            <div class="choices">
              <select id="planId" class="choices" bind:value={planId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>

        <div class="input-field col s12">
          <input id="registerDomain" type="text" class="validate" bind:value={registerDomain} on:change={() => findAppId()}>
          <label for="registerDomain">register domain</label>
        </div>
        <div class="input-field col s12">
          <input id="registerState" type="text" class="validate" bind:value={registerState} on:change={() => findAppId()}>
          <label for="registerState">register state</label>
        </div>
        {#if registerId}
          <div style="padding: 0 0.75em;">
            <h5>Register Id:</h5>
            <p>{registerId}</p>
          </div>
        {/if}

        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/licenses`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
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

  .choices {
    position: absolute;
    right: 0.75em;
    left: 0.75em;
    z-index: 10;
  }

  .label {
    color: #9E9E99;
    font-size: 0.7em;
    margin-top: -1em;
  }

  textarea {
    background: #fff;
    border: 1px solid #aaa;
    min-height: 5em;
  }
</style>