
<script>
  import { onMount } from "svelte";

  export let domain
  export let state
  export let hostId
  export let active

  let navigation = [
    {
      slug: '',
      name: 'License Key',
      icon: 'vpn_key'
    },
  ]

  if (hostId) {
    navigation.push({
      slug: 'host-provider',
      name: 'Host Provider',
      icon: 'domain'
    })
    navigation.push({
      slug: 'change-subscription-plan',
      name: 'Change Subscription Plan',
      icon: 'card_membership'
    })
    navigation.push({
      slug: 'domain-name',
      name: 'Domain Name',
      icon: 'store'
    })
    navigation.push({
      slug: 'dns-records',
      name: 'DNS Records',
      icon: 'golf_course'
    })
    navigation.push({
      slug: 'terminate-subscription-plan',
      name: 'Terminate Subscription Plan',
      icon: 'card_travel'
    })
  } else {
    navigation.push({
      slug: 'purchase-subscription-plan',
      name: 'Purchase Subscription Plan',
      icon: 'card_giftcard'
    })
  }

  onMount(() => {
    
  })
</script>

<h3 class="title">SETTINGS:</h3>
<ul class="sidenav">
  {#each navigation as nav}
    <a href={`/apps/${domain}/${state}/open-source/${nav.slug}`}>
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