<script>
  import { onMount } from 'svelte';
  import Delete from './Delete.svelte'

	export let domain
  export let state
  export let slugId = '';

  let name = ''
  let slug = slugId
  let price
  let purchaseUrl
  let appId
  let grantMarketing
  let grantShop
  let grantForum
  let grantChannel
  let grantPromo
  let limitOnlineVisitors
  let limitFileStorage
  let limitEventSources
  let limitDatabaseRecords
  let details
  let raw

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

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      price,
      purchaseUrl,
      grantMarketing,
      grantShop,
      grantForum,
      grantChannel,
      grantPromo,
      limitOnlineVisitors,
      limitFileStorage,
      limitEventSources,
      limitDatabaseRecords,
      raw,
      details
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

      // fetch p
      let esProduct = await scripts.subscription.plans.getOne(appId, slug)
      console.log('esProduct', esProduct)
      if (esProduct.payload.success === true) {
        let data = esProduct.payload.data
        name = data.name
        slug = data.slug
        price = data.price
        purchaseUrl = data.purchaseUrl
        grantMarketing = data.grantMarketing
        grantShop = data.grantShop
        grantForum = data.grantForum
        grantChannel = data.grantChannel
        grantPromo = data.grantPromo
        limitOnlineVisitors = data.limitOnlineVisitors
        limitFileStorage = data.limitFileStorage
        limitEventSources = data.limitEventSources
        limitDatabaseRecords = data.limitDatabaseRecords
        raw = data.raw
        details = data.details
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esProduct.payload.reason)
      }
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE PLAN</h3>
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
          <input id="price" type="number" step="0.01" class="validate" bind:value={price}>
          <label for="price">Price</label>
        </div>
        <div class="input-field col s12">
          <input id="purchaseUrl" type="text" class="validate" bind:value={purchaseUrl}>
          <label for="purchaseUrl">Purchase Url</label>
        </div>
        <div class="input-field col s12">
          <textarea id="details" type="text" class="validate" bind:value={details}></textarea>
          <label for="details">Details</label>
        </div>
        <div class="input-field col s12">
          <div>Marketing:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantMarketing} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div>Shop:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantShop} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div>Forum:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantForum} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div>Channel:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantChannel} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div>Promo:</div>
          <div class="switch">
            <label>
              deny
              <!-- svelte-ignore M -->
              <input type="checkbox" bind:checked={grantPromo} on:change={() => setTimeout(() => window.M.updateTextFields(), 0)}>
              <span class="lever"></span>
              grant
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <input id="limitOnlineVisitors" type="number" step="1" class="validate" bind:value={limitOnlineVisitors}>
          <label for="limitOnlineVisitors">limitOnlineVisitors in #/mo</label>
        </div>
        <div class="input-field col s12">
          <input id="limitFileStorage" type="number" step="1" class="validate" bind:value={limitFileStorage}>
          <label for="limitFileStorage">limitFileStorage in GB/mo</label>
        </div>
        <div class="input-field col s12">
          <input id="limitEventSources" type="number" step="1" class="validate" bind:value={limitEventSources}>
          <label for="limitEventSources">limitEventSources in GB/mo</label>
        </div>
        <div class="input-field col s12">
          <input id="limitDatabaseRecords" type="number" step="1" class="validate" bind:value={limitDatabaseRecords}>
          <label for="limitDatabaseRecords">limitDatabaseRecords in GB/mo</label>
        </div>
        <div class="input-field col s12">
          <textarea id="raw" type="text" class="validate" bind:value={raw}></textarea>
          <label for="raw">Raw</label>
        </div>
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/plans`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
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

  textarea {
    background: #fff;
    border: 1px solid #aaa;
    min-height: 10em;
  }
</style>