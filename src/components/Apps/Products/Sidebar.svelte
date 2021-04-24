
<script>
  import { onMount } from "svelte";

  export let domain
  export let state
  export let slug

  let navigation = [
    {
      slug: '',
      name: 'Product'
    },
    {
      slug: 'category',
      name: 'Category'
    },
    {
      slug: 'price',
      name: 'Price'
    },
    {
      slug: 'website-url',
      name: 'Website URL'
    },
    {
      slug: 'content',
      name: 'Content'
    },
    {
      slug: 'variants',
      name: 'Variants'
    },
    {
      slug: 'tags',
      name: 'Tags'
    }
  ]

  onMount(() => {
    setTimeout(() => {

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    }, 1000)
  })
</script>


<h3 class="title">SETTINGS:</h3>
<ul class="sidenav">
  {#each navigation as nav}
    <a href={`/apps/${domain}/${state}/products/${slug}/${nav.slug}`}>
      <li class="waves-effect" style="width: 100%;">
        <span class="name">{nav.name}</span>
      </li>
    </a>
  {/each}
</ul>

<style>
  .title {
    text-align: center;
    font-size: 2em;
    font-weight: 100;
  }

  ul {
    border-top: 1px solid #aaa;
  }

  ul li {
    border-bottom: 1px solid #aaa;
    display: grid;
    grid-template-columns: 1fr;
    padding: 0.5em;
  }

  .name {
    margin-top: 0.1em;
    margin-left: 0.5em;
  }

  .sidenav {
    -webkit-transform: inherit !important;
    transform: inherit !important;
    background-color: transparent;
    position: inherit;
    padding: 0;
    overflow-y: visible;
    -webkit-box-shadow: none;
    box-shadow: none;
    width: 100%;
    height: fit-content;
  }
  .sidenav li {
    line-height: inherit;
  }
</style>