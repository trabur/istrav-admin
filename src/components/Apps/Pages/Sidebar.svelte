
<script>
  import { onMount } from "svelte";

  export let domain
  export let state
  export let slug

  let navigation = [
    {
      slug: '',
      name: 'Page'
    },
    {
      slug: 'layout',
      name: 'Layout'
    },
    {
      slug: 'submit-form',
      name: 'Submit Form'
    },
    {
      slug: 'main-menu',
      name: 'Main Menu'
    },
    {
      slug: 'navigation-menu',
      name: 'Navigation Menu'
    },
    {
      slug: 'footer-menu',
      name: 'Footer Menu'
    },
    {
      slug: 'related-collection',
      name: 'Related Collection'
    },
    {
      slug: 'related-subscription-plans',
      name: 'Related Subscription Plans'
    },
    {
      slug: 'related-playlist',
      name: 'Related Playlist'
    },
    {
      slug: 'related-bulletin-board',
      name: 'Related Bulletin Board'
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
    <a href={`/apps/${domain}/${state}/pages/${slug}/${nav.slug}`}>
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