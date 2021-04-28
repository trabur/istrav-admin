<script>
  import { onMount } from 'svelte';

  import Delete from './Delete.svelte'
  import Sidebar from './Sidebar.svelte'

	export let domain
  export let state
  export let slugId = '';

  let name = ''
  let slug = slugId
  let appId
  let details
  let raw
  let endpoint

  let purchaseId = ''
  let products = []
  let purchaseIdChoices

  function isValidJson(string) {
    try {
      JSON.parse(string)
    } catch (e) {
      return false
    }
    return true
  }

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    if (!isValidJson(raw)) return alert('Raw must be valid JSON.')
    if (!isValidJson(details)) return alert('Details must be valid JSON.')
    purchaseId = purchaseIdChoices.getValue(true)
    console.log('purchaseId', purchaseId)

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      raw,
      details,
      purchaseId,
    }
    let esUpdate = await scripts.subscription.plans.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/plans`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      endpoint = esOne.payload.data.endpoint

      // fetch p
      let esPlan = await scripts.subscription.plans.getOne(appId, slug)
      console.log('esPlan', esPlan)
      if (esPlan.payload.success === true) {
        let data = esPlan.payload.data
        name = data.name
        slug = data.slug
        raw = data.raw
        details = data.details
        purchaseId = data.purchaseId
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esPlan.payload.reason)
      }

      // fetch products for dropdown
      let esProducts = await scripts.store.products.getAll(appId)
      console.log('esProducts', esProducts)
      if (esProducts.payload.success === true) {
        products = esProducts.payload.data
      } else {
        alert(esProducts.payload.reason)
      }

      setTimeout(() => {
        const purchaseIdElement = document.querySelector('#purchaseId');
        purchaseIdChoices = new Choices(purchaseIdElement);
        products.forEach((value, index) => {
          console.log(`${value.id} === ${purchaseId}`)
          if (value.id === purchaseId) {
            products[index].selected = true
          }
          products[index].value = value.id
          products[index].label = value.name
        })
        console.log('products', products)
        purchaseIdChoices.setChoices(products, 'value', 'label', false)
      }, 0)
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/plans</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}/plans`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/{slugId}</h3>
      <div style="text-align: right;">
        <Delete appId={appId} slug={slugId} domain={domain} state={state} />
        <a href={`http://${endpoint}.tyu67.com/plans/${slugId}`} class="waves-effect btn right teal" style="margin-right: 1em;" target="_blank"><i class="navicon material-icons">public</i></a>
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <Sidebar domain={domain} state={state} slug={slug} active="" />
  </div>
  <div class="col s12 m7">
    <h3 class="title">Subscription Plan</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>

        <div class="input-field col s12">
          {#if products.length}
            <div class="label">Purchase</div>
            <div class="choices">
              <select id="purchaseId" class="choices" bind:value={purchaseId}></select>
            </div>
            <br />
            <br />
            <br />
          {/if}
        </div>

        <div class="input-field col s12">
          <textarea id="details" type="text" class="validate" bind:value={details}></textarea>
          <label for="details">Details</label>
        </div>

        <div class="input-field col s12">
          <textarea id="raw" type="text" class="validate" bind:value={raw}></textarea>
          <label for="raw">Raw</label>
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .header {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .path {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    float: left;
    color: #555;
    line-height: 1.5em;
  }

  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }

  textarea {
    background: #fff;
    border: 1px solid #aaa;
    min-height: 10em;
  }

  .choices {
    position: absolute;
    right: 0.75em;
    left: 0.75em;
    z-index: 10;
  }

</style>