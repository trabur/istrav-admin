<script>
  import { onMount } from 'svelte';

  import SidebarPlans from '../../SidebarPlans.svelte'

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
  let details
  let raw

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
      // price,
      purchaseUrl,
      grantMarketing,
      grantShop,
      grantForum,
      grantChannel,
      grantPromo,
      raw,
      details,
      purchaseId,
    }
    let esUpdate = await scripts.subscription.plans.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/plans/${slug}`
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
      let esPlan = await scripts.subscription.plans.getOne(appId, slug)
      console.log('esPlan', esPlan)
      if (esPlan.payload.success === true) {
        let data = esPlan.payload.data
        name = data.name
        slug = data.slug
        // price = data.price
        purchaseUrl = data.purchaseUrl
        grantMarketing = data.grantMarketing
        grantShop = data.grantShop
        grantForum = data.grantForum
        grantChannel = data.grantChannel
        grantPromo = data.grantPromo
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
  <div class="col s12 m2"></div>
  <div class="col s12 m3">
    <SidebarPlans domain={domain} state={state} slug={slug} />
  </div>
  <div class="col s12 m5">
    <h3 class="title">Hosting Access</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          coming soon...
        </div>
      </div>
    </div>
    <div style="text-align: right;">
      <a href={`/apps/${domain}/${state}/plans`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
    </div>
  </div>
  <div class="col s12 m2"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }

</style>