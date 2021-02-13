<script>
  import { onMount } from 'svelte';
  import { each } from 'svelte/internal';

	export let domain = '';
  export let state = '';
  export let slugId = '';

  let name = ''
  let slug = slugId
  let image = ''
  let appId
  let categoryId = ''
  let categories = []
  let categoryIdChoices

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    categoryId = categoryIdChoices.getValue(true)
    console.log('categoryId', categoryId)

    let token = localStorage.getItem('token')
    let change = {
      name,
      slug,
      image,
      categoryId
    }
    let esSave = await scripts.store.products.getUpdate(appId, token, slugId, change)
    console.log('esSave', esSave)
    if (esSave.payload.success === true) {
      window.location = `/apps/${domain}/${state}/products`
    } else {
      alert(esSave.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();

    let esOne = await scripts.tenant.apps.getOne(domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id

      // fetch product
      let esProduct = await scripts.store.products.getOne(appId, slug)
      console.log('esProduct', esProduct)
      if (esProduct.payload.success === true) {
        let data = esProduct.payload.data
        name = data.name
        slug = data.slug
        image = data.image
        categoryId = data.categoryId
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
    } else {
      alert(esOne.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE PRODUCT</h3>
    <div class="card" style="padding: 1em; background: #eee;">
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
          <input id="image" type="text" class="validate" bind:value={image}>
          <label for="image">Image</label>
        </div>
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
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <a href={`/apps/${domain}/${state}/products`} class="waves-effect red lighten-2 btn">PRODUCTS</a>
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
</style>