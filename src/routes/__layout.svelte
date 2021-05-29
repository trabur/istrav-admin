<script context="module">
  export async function load({ session }) {
    return { 
      apiUri: import.meta.env.VITE_API_URI,
      ioUri: import.meta.env.VITE_IO_URI,
      headlessUri: import.meta.env.VITE_HEADLESS_URI,
    };
  }
</script>

{#if loading}
  <!-- do nothing -->
{:else}
  <slot></slot>
{/if}

<div id="code"></div>

<script>
  import { onMount } from 'svelte';
	import { appData, domainId, backendId, headlessId, ioId } from '../stores.js';

  import { istrav, scripts } from '../../farmerless/api'

  export let apiUri
  export let ioUri
  export let headlessUri

  let app
  appData.subscribe(value => {
		app = value
	})
  let domain
  domainId.subscribe(value => {
		domain = value
	})
  let backend
  backendId.subscribe(value => {
		backend = value
	})
  let headless
  headlessId.subscribe(value => {
    headless = value
	})
  let io
  ioId.subscribe(value => {
    io = value
	})

  let loading = true
  let state = 'production'

  onMount(async () => {
    // setup links
    if (window.location.host === 'localhost:5280') {
      console.log('using localhost settings:')
      domainId.set('istrav.com')
      headlessId.set('http://localhost:9999')
      backendId.set('http://localhost:1337')
      ioId.set('http://localhost:3333')
    } else {
      console.log('using production settings:')
      domainId.set(window.location.host)
      headlessId.set(headlessUri || 'https://farmerless.com')
      backendId.set(apiUri || 'https://api.hacktracks.org')
      ioId.set(ioUri || 'https://io.hacktracks.org')
    }
    console.log(domain, backend, headless, io)
    
    // configure backend
    istrav.account.carts.init({ host: backend })
    istrav.account.orders.init({ host: backend })
    istrav.account.users.init({ host: backend })
    istrav.app.blocks.init({ host: backend })
    istrav.app.faq.init({ host: backend })
    istrav.app.menus.init({ host: backend })
    istrav.app.pages.init({ host: backend })
    istrav.channel.guides.init({ host: backend })
    istrav.channel.playlists.init({ host: backend })
    istrav.channel.videos.init({ host: backend })
    istrav.store.categories.init({ host: backend })
    istrav.store.collections.init({ host: backend })
    istrav.store.products.init({ host: backend })
    istrav.subscription.licenses.init({ host: backend })
    istrav.subscription.plans.init({ host: backend })
    istrav.tenant.apps.init({ host: backend })
    istrav.tenant.members.init({ host: backend })

    loading = false
  })
</script>