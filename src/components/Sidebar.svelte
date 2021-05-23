
<script>
  import { onMount } from "svelte";

  export let domain
  export let state
  export let active = ''
  let M

  let navigation = [
    {
      slug: '',
      name: 'Dashboard',
      icon: 'dashboard'
    },
    {
      slug: 'appearance',
      name: 'Appearance',
      icon: 'brush'
    },
    {
      slug: 'intro',
      name: 'Introduction',
      icon: 'highlight'
    },
    {
      slug: 'menus',
      name: 'Menus',
      icon: 'format_list_numbered'
    },
    {
      slug: 'blocks',
      name: 'Blocks',
      icon: 'picture_in_picture'
    },
    {
      slug: 'pages',
      name: 'Pages',
      icon: 'note'
    },
    {
      slug: 'faq',
      name: 'FAQ',
      icon: 'help'
    },
    {
      slug: 'collections',
      name: 'Collections',
      icon: 'apps'
    },
    {
      slug: 'categories',
      name: 'Categories',
      icon: 'widgets'
    },
    {
      slug: 'products',
      name: 'Products',
      icon: 'stop'
    },
    {
      slug: 'plans',
      name: 'Subscription Plans',
      icon: 'card_membership'
    },
    {
      slug: 'licenses',
      name: 'License Keys',
      icon: 'vpn_key'
    },
    {
      slug: 'orders',
      name: 'Orders',
      icon: 'markunread_mailbox'
    },
    {
      slug: 'videos',
      name: 'Channel Videos',
      icon: 'videocam'
    },
    {
      slug: 'guides',
      name: 'Channel Guides',
      icon: 'ondemand_video'
    },
    {
      slug: 'playlists',
      name: 'Playlists',
      icon: 'playlist_play'
    },
    {
      slug: 'forums',
      name: 'Bulletin Boards',
      icon: 'forum'
    },
    {
      slug: 'topics',
      name: 'Message Topics',
      icon: 'chat'
    },
    {
      slug: 'comments',
      name: 'Topic Comments',
      icon: 'comment'
    },
    {
      slug: 'stored-media',
      name: 'Stored Media',
      icon: 'sd_storage'
    },
    {
      slug: 'hosting',
      name: 'Hosting',
      icon: 'dns'
    },
    // {
    //   slug: 'host-domain-names',
    //   name: 'Host Domain Names',
    //   icon: 'store'
    // },
    // {
    //   slug: 'host-dns-records',
    //   name: 'Host DNS Records',
    //   icon: 'public'
    // },
    // {
    //   slug: 'host-object-storage',
    //   name: 'Host Object Storage',
    //   icon: 'inbox'
    // },
    // {
    //   slug: 'host-databases',
    //   name: 'Host Databases',
    //   icon: 'layers'
    // },
    // {
    //   slug: 'host-deployments',
    //   name: 'Host Deployments',
    //   icon: 'storage'
    // },
    {
      slug: 'identification-access-management',
      name: 'IAM',
      icon: 'security'
    },
    {
      slug: 'open-source',
      name: 'Open Source',
      icon: 'power'
    },
    {
      slug: 'settings',
      name: 'Settings',
      icon: 'settings'
    },
    {
      slug: 'notifications',
      name: 'Notifications',
      icon: 'notifications'
    },
    {
      slug: 'event-sources',
      name: 'Event Sources',
      icon: 'event_note'
    },
  ]

  onMount(() => {
    M = window['M']
    
    setTimeout(() => {

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    }, 1000)
  })
</script>


<div class="masonry">
  <div class="left-panel card">
    <h5 style="text-align: center;">Admin Control<br />Panel</h5>
    <ul class="sidenav">
      {#each navigation as nav}
        <a href={`/apps/${domain}/${state}/${nav.slug}`}>
          <li class={`waves-effect ${nav.slug === active ? 'active' : null}`} style="width: 100%;">
            <i class="navicon material-icons">{nav.icon}</i> <span class="name">{nav.name}</span>
          </li>
        </a>
      {/each}
    </ul>
  </div>
  <div class="right-panel">
    <slot></slot>
  </div>
</div>

<style>
  ul {
    border-top: 1px solid #eee;
  }

  ul li {
    border-bottom: 1px solid #eee;
    display: grid;
    grid-template-columns: 24px 1fr;
    padding: 0.5em;
  }
  
  .navicon {
    margin-top: 0.1em;
  }

  .name {
    margin-top: 0.1em;
    margin-left: 0.5em;
  }
  
  .masonry {
    width: 100%;
    display: grid;
    grid-template-columns: 0.2fr 1fr;
  }

  .masonry .left-panel {
    margin: 0;
    padding: 0.5em 0;
  }

  .masonry .left-panel,
  .masonry .right-panel {
    height: 100vh;
    overflow: auto;
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