
{#if loading}
  <!-- do nothing -->
{:else}
  <slot></slot>
{/if}

<div id="code"></div>

<script>
  import { onMount, onDestroy } from 'svelte';
  import axios from 'axios'

  let loading = true

  onMount(() => {
    // fetch library
    window.axios = axios

    // appId domain state
    if (window.location.host === 'localhost:3000') {
      window.appDomain = 'istrav.com'
    } else {
      window.appDomain = window.location.host
    }

    // headless.istrav.com scripts
    var code = document.createElement('script');
    code.onload = function (event) {
      // headless scripts & istrav will attach to window
      // console.log(window.scripts)
      // console.log(window.istrav)

      istrav.tenant.members.init({ host: 'https://api.istrav.com' })
      istrav.tenant.apps.init({ host: 'https://api.istrav.com' })
      istrav.app.menus.init({ host: 'https://api.istrav.com' })
      istrav.app.pages.init({ host: 'https://api.istrav.com' })
      istrav.store.collections.init({ host: 'https://api.istrav.com' })
      istrav.store.categories.init({ host: 'https://api.istrav.com' })
      istrav.store.products.init({ host: 'https://api.istrav.com' })
      istrav.subscription.licenses.init({ host: 'https://api.istrav.com' })
      istrav.subscription.plans.init({ host: 'https://api.istrav.com' })
      istrav.channel.videos.init({ host: 'https://api.istrav.com' })
      istrav.channel.guides.init({ host: 'https://api.istrav.com' })
      loading = false
    };
    code.src = 'https://farmerless.com/scripts/index.js';
    code.setAttribute('type', 'module')
    document.getElementById('code').appendChild(code); 
  })
</script>