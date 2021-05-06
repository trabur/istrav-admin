<script>
  import { onMount } from 'svelte';
  
  import Sidebar from './Sidebar.svelte'
  import Delete from './Delete.svelte'

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let image = ''
  let appId
  let uploads
  let categoryId = ''
  let categories = []
  let categoryIdChoices
  let price = 0
  let description
  let details
  let url
  let token
  let afterPurchase
  let afterPurchases = [
    {
      id: '{SUBSCRIPTION_PLAN}',
      name: 'Add to subscription plans'
    },
    {
      id: '{ORDER_FULFILLMENT}',
      name: 'Add to orders'
    },
    {
      id: '{DO_NOTHING}',
      name: 'Do nothing'
    },
  ]
  let subscriptionPlanId = ''
  let subscriptionPlans = []
  let subscriptionPlanIdChoices
  let afterPurchaseChoices
  let stockKeepingUnit
  let inStockCount
  let endpoint

  function afterPurchaseChange () {
    afterPurchase = afterPurchaseChoices.getValue(true)
    console.log('afterPurchase', afterPurchase)
    
    loadSubscriptionPlans()
    setTimeout(() => M.updateTextFields(), 0)
  }

	async function change () {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    categoryId = categoryIdChoices.getValue(true)
    console.log('categoryId', categoryId)

    afterPurchase = afterPurchaseChoices.getValue(true)
    console.log('afterPurchase', afterPurchase)

    subscriptionPlanId = subscriptionPlanIdChoices.getValue(true)
    console.log('subscriptionPlanId', subscriptionPlanId)

    let change = {
      name,
      slug,
      image,
      categoryId,
      price: price * 100,
      description,
      details,
      url,
      afterPurchase,
      subscriptionPlanId,
      stockKeepingUnit,
      inStockCount
    }
    let esUpdate = await scripts.store.products.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      M.toast({html: `Successfuly updated: /${slug}`})
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  function loadSubscriptionPlans () {
    setTimeout(() => {
      const subscriptionPlanIdElement = document.querySelector('#subscriptionPlanId');
      subscriptionPlanIdChoices = new Choices(subscriptionPlanIdElement);
      subscriptionPlans.forEach((value, index) => {
        console.log(`${value.id} === ${subscriptionPlanId}`)
        if (value.id === subscriptionPlanId) {
          subscriptionPlans[index].selected = true
        }
        subscriptionPlans[index].value = value.id
        subscriptionPlans[index].label = value.name
      })
      console.log('subscriptionPlans', subscriptionPlans)
      subscriptionPlanIdChoices.setChoices(subscriptionPlans, 'value', 'label', false)
    }, 100)
  }

  onMount(async () => {
    M.updateTextFields();
    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      uploads = esOne.payload.data.uploads
      endpoint = esOne.payload.data.endpoint

      // fetch product
      let esProduct = await scripts.store.products.getOne(appId, slug)
      console.log('esProduct', esProduct)
      if (esProduct.payload.success === true) {
        let data = esProduct.payload.data
        name = data.name
        slug = data.slug
        image = data.image
        categoryId = data.categoryId
        price = data.price / 100
        description = data.description
        details = data.details
        url = data.url
        afterPurchase = `{${data.afterPurchase[0]}}`
        subscriptionPlanId = data.subscriptionPlanId
        stockKeepingUnit = data.stockKeepingUnit
        inStockCount = data.inStockCount
        setTimeout(() => M.updateTextFields(), 0)
      } else {
        alert(esProduct.payload.reason)
      }

      // fetch categories for dropdown
      let esCategories = await scripts.store.categories.getAll(appId)
      console.log('esCategories', esCategories)
      if (esCategories.payload.success === true) {
        categories = esCategories.payload.data
      } else {
        alert(esCategories.payload.reason)
      }
      
      setTimeout(() => {
        const categoryIdElement = document.querySelector('#categoryId');
        categoryIdChoices = new Choices(categoryIdElement);
        categories.forEach((value, index) => {
          console.log(`${value.id} === ${categoryId}`)
          if (value.id === categoryId) {
            categories[index].selected = true
          }
          categories[index].value = value.id
          categories[index].label = value.name
        })
        console.log('categories', categories)
        categoryIdChoices.setChoices(categories, 'value', 'label', false)
      }, 0)

      setTimeout(() => {
        const afterPurchaseElement = document.querySelector('#afterPurchase');
        afterPurchaseChoices = new Choices(afterPurchaseElement);
        afterPurchases.forEach((value, index) => {
          console.log(`${value.id} === ${afterPurchase}`)
          if (value.id === afterPurchase) {
            afterPurchases[index].selected = true
          }
          afterPurchases[index].value = value.id
          afterPurchases[index].label = value.name
        })
        console.log('afterPurchases', afterPurchases)
        afterPurchaseChoices.setChoices(afterPurchases, 'value', 'label', false)
      }, 0)

      // fetch plans for dropdown
      let esPlans = await scripts.subscription.plans.getAll(appId)
      console.log('esPlans', esPlans)
      if (esPlans.payload.success === true) {
        subscriptionPlans = esPlans.payload.data
      } else {
        alert(esPlans.payload.reason)
      }
      
      loadSubscriptionPlans()
    } else {
      alert(esOne.payload.reason)
    }
  })

	let preview
  let fileinput
  let files
	
	const onFileSelected = (e) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      preview = e.target.result
    }
  }

  function upload() {
    if (!preview) {
      return alert('Please select a file before doing that.')
    }

    const formData = new FormData()
    formData.append('appId', appId)
    formData.append('token', token)
    formData.append('folder', `products/${slug}`)
    formData.append('sampleFile', files[0])

    fetch(`${window.backend}/v1/files/upload`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json()).then((result) => {
        console.log('Success:', result)
        // reset form
        files = null
        fileinput = null
        preview = null
        // update main
        image = result.payload.data.Key
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/products</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}/products`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/{slugId}</h3>
      <div style="text-align: right;">
        <Delete appId={appId} slug={slugId} domain={domain} state={state} />
        <a href={`http://${endpoint}.tyu67.com/products/${slugId}`} class="waves-effect btn right teal" style="margin-right: 1em;" target="_blank"><i class="navicon material-icons">public</i></a>
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
    <h3 class="title">Product</h3>
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
        
        {#if preview}
          <img class="preview" src="{preview}" alt="d" style="max-width: 100%;" />
        {/if}
        <button class="btn" on:click={(e)=>{e.preventDefault();fileinput.click();}}>Select Media</button>
        <button class="btn right" on:click={upload}>UPLOAD</button>
        <input type="file" name="sampleFile" style="display:none" on:change={(e)=>onFileSelected(e)} bind:files bind:this={fileinput} >
        <br />
        <br />

        <div class="input-field col s12">
          <input id="image" type="text" class="validate" bind:value={image}>
          <label for="image">Image</label>
        </div>
        <img src={`${uploads}/${image}`} alt="" style="width: 100%;" />
        <p>{`${uploads}/${image}`}</p>

        <div class="input-field col s12">
          {#if categories.length}
            <div class="label">Category</div>
            <div class="choices">
              <select id="categoryId" class="choices" bind:value={categoryId}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>
        <div class="input-field col s12">
          <input id="price" type="number" step="0.01" class="validate" bind:value={price}>
          <label for="price">Price</label>
        </div>
        <div class="input-field col s12">
          <textarea id="description" type="text" class="validate" bind:value={description}></textarea>
          <label for="description">Description</label>
        </div>
        <div class="input-field col s12">
          <textarea id="details" type="text" class="validate" bind:value={details} style="height: 15em;"></textarea>
          <label for="details">Details</label>
        </div>
        <div class="input-field col s12">
          <input id="url" type="text" class="validate" bind:value={url}>
          <label for="url">URL</label>
        </div>

        <div class="input-field col s12" style="z-index: 4;">
          {#if afterPurchases.length}
            <div class="label">After Purchase</div>
            <div class="choices">
              <!-- svelte-ignore a11y-no-onchange -->
              <select id="afterPurchase" class="choices" bind:value={afterPurchase} on:change={() => afterPurchaseChange()}></select>
            </div>
            <br />
            <br />
          {/if}
        </div>
        <div class="input-field col s12 subscription-plan" style={afterPurchase === '{SUBSCRIPTION_PLAN}' ? 'display: visible;' : 'display: none;'}>
          <div class="label">Subscription Plan</div>
          <div class="choices">
            <select id="subscriptionPlanId" class="choices" bind:value={subscriptionPlanId}></select>
          </div>
          <br />
          <br />
        </div>
        {#if afterPurchase === '{ORDER_FULFILLMENT}'}
          <div class="input-field col s12">
            <input id="stockKeepingUnit" type="text" class="validate" bind:value={stockKeepingUnit}>
            <label for="stockKeepingUnit">Stock Keeping Unit (SKU)</label>
          </div>
          <div class="input-field col s12">
            <input id="inStockCount" type="number" step="1" class="validate" bind:value={inStockCount}>
            <label for="inStockCount">Product In Stock Count</label>
          </div>
        {/if}
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

  .subscription-plan {
    z-index: 3;
  }
</style>