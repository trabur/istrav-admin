
<script>
  import { onMount } from "svelte";

  export let domain
  export let state
  export let slug
  export let active
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']

  let navigation = [
    {
      slug: '',
      name: 'Page',
      icon: 'note'
    },
    {
      slug: 'wireframe',
      name: 'Wireframe',
      icon: 'crop'
    },
    {
      slug: 'blocks',
      name: 'Blocks',
      icon: 'picture_in_picture'
    },
    {
      slug: 'place-into-slots',
      name: 'Place Into Slots',
      icon: 'content_paste'
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