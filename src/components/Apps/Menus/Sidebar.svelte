
<script>
  import { onMount } from "svelte";
  
  export let domain
  export let state
  export let slug
  export let active
  let M

  let navigation = [
    {
      slug: '',
      name: 'Menu',
      icon: 'menu'
    },
    {
      slug: 'order-items',
      name: 'Order Items',
      icon: 'low_priority'
    },
    {
      slug: 'edit-items',
      name: 'Edit Items',
      icon: 'playlist_add'
    }
  ]

  onMount(() => {
    M = window['M']
    
    setTimeout(() => {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    }, 1000)
  })
</script>


<h3 class="title">SETTINGS:</h3>
<ul class="sidenav">
  {#each navigation as nav}
    <a href={`/apps/${domain}/${state}/menus/${slug}/${nav.slug}`}>
      <li class={`waves-effect ${nav.slug === active ? 'active' : null}`} style="width: 100%;">
        <i class="navicon material-icons">{nav.icon}</i> <span class="name">{nav.name}</span>
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
    grid-template-columns: 24px 1fr;
    padding: 0.5em;
  }

  ul li .active {
    background-color: #aaa;
  }
  
  .navicon {
    margin-top: 0.1em;
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