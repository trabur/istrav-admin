<script>
  import { onMount } from 'svelte';
  import slugify from 'slugify'
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

	async function change() {
    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    categoryId = categoryIdChoices.getValue(true)
    console.log('categoryId', categoryId)

    let change = {
      name,
      slug,
      image,
      categoryId,
      price: price * 100,
      description,
      details,
      url
    }
    let esUpdate = await scripts.store.products.getUpdate(appId, token, slugId, change)
    console.log('esUpdate', esUpdate)
    if (esUpdate.payload.success === true) {
      window.location = `/apps/${domain}/${state}/products`
    } else {
      alert(esUpdate.payload.reason)
    }
  }

  onMount(async () => {
    M.updateTextFields();
    token = localStorage.getItem('token')

    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      appId = esOne.payload.data.id
      uploads = esOne.payload.data.uploads

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

    fetch('https://hacktracks.org/v1/files/upload', {
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

<div class="row" style="min-height: 100vh;">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">CHANGE PRODUCT</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name} on:change={() => slug = slugify(name)}>
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
        <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => change()}>Submit</button>
      </div>
    </div>
    <div style="text-align: right;">
      <Delete appId={appId} slug={slugId} domain={domain} state={state} />
      <a href={`/apps/${domain}/${state}/products`} class="waves-effect btn" style="margin-right: 0.5em;">CANCEL</a>
    </div>
  </div>
  <div class="col s12 m4"></div>
</div>
<br />
<br />
<br />

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