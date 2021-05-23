<script context="module">
  export async function load({ session }) {
    const { API_URI, IO_URI, HEADLESS_URI } = session;

    return { 
      apiUri: API_URI,
      ioUri: IO_URI,
      headlessUri: HEADLESS_URI,
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
  import { onMount, onDestroy } from 'svelte';
  
  import '../../static/global.css'
  import '../../static/table.css'

  export let apiUri
  export let ioUri
  export let headlessUri

  let domainId
  let backend
  let headless
  let io

  let loading = false

  onMount(() => {
    // appId domain state
    if (window.location.host === 'localhost:5280') {
      domainId = 'istrav.com'
      headless = 'http://localhost:9999'
      backend = 'http://localhost:1337'
      io = 'http://localhost:3333'
      console.log('localhost settings:', domainId, backend, headless, io)
    } else {
      domainId = window.location.host
      headless = headlessUri || 'https://farmerless.com'
      backend = apiUri || 'https://api.hacktracks.org'
      io = ioUri || 'https://io.hacktracks.org'
      console.log('production settings:', domainId, backend, headless, io)
    }

    // expose vars for use within app
    // window['backend'] = backend
    // window['io'] = io
    // window['headless'] = headless
  })
</script>