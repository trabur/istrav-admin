
<script>
import Nav from "./Nav.svelte"

  export let domain
  export let state

  let navigation = [
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
      slug: 'menus',
      name: 'Menus',
      icon: 'format_list_numbered'
    },
    {
      slug: 'pages',
      name: 'Pages',
      icon: 'note'
    },
    {
      slug: 'users',
      name: 'Users',
      icon: 'person'
    },
    {
      slug: 'orders',
      name: 'Orders',
      icon: 'markunread_mailbox'
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
      slug: 'media-storage',
      name: 'Media Storage',
      icon: 'attach_file'
    },
    {
      slug: 'collaborators',
      name: 'Collaborators',
      icon: 'contacts'
    },
  ]
</script>


<div class="masonry">
  <div class="left-panel card">
    <h5 style="text-align: center;">Admin Control<br />Panel</h5>
    <ul>
      {#each navigation as nav}
        <a href={`/apps/${domain}/${state}/${nav.slug}`}>
          <li class="waves-effect" style="width: 100%;">
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
    padding: 0.5em;
  }

  .masonry .left-panel,
  .masonry .right-panel {
    height: 100vh;
    overflow: auto;
  }
</style>