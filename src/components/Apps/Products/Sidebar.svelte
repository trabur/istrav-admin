
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
      name: 'Product',
      icon: 'stop'
    },
    {
      slug: 'category',
      name: 'Category',
      icon: 'widgets'
    },
    {
      slug: 'price',
      name: 'Price',
      icon: 'attach_money'
    },
    {
      slug: 'image-gallery',
      name: 'Image Gallery',
      icon: 'image'
    },
    {
      slug: 'website-url',
      name: 'Website URL',
      icon: 'public'
    },
    {
      slug: 'variants',
      name: 'Variants',
      icon: 'tune'
    },
    {
      slug: 'purchased-orders',
      name: 'Purchased Orders',
      icon: 'markunread_mailbox'
    },
    {
      slug: 'purchased-license-keys',
      name: 'Purchased License Keys',
      icon: 'vpn_key'
    },
    {
      slug: 'trigger-scripts',
      name: 'Trigger Scripts',
      icon: 'restore_page'
    },
    {
      slug: 'event-sources',
      name: 'Event Sources',
      icon: 'event_note'
    },
    {
      slug: 'tags',
      name: 'Tags',
      icon: 'tag'
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
    <a href={`/apps/${domain}/${state}/products/${slug}/${nav.slug}`}>
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