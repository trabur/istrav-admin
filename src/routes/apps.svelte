<svelte:head>
	<title>METAHEAP: Applications</title>
</svelte:head>

<script>
  import { onMount } from 'svelte'
  import List from '../components/Apps/List.svelte'
  import MyProfile from '../components/Apps/MyProfile.svelte'
	import Welcome from '../components/Auth/Welcome.svelte'
  
  import GoogleAnalytics from '../components/Footer/GoogleAnalytics.svelte'

  let display = false
  onMount(() =>{
    let loader = setInterval(() => {
      if (window.scripts) {
        display = true
        clearInterval(loader)
      }
    }, 100)

		// if not already logged in then direct to login
		if (!localStorage.getItem('token')) {
			window.location.href = '/'
		}
  })
</script>

<div class="dotted">
	<div class="masonry row">
		<div class="col s12 m6 hide-on-small-and-down" style="padding-left: 0;">
			<Welcome />
		</div>
		<div class="col s12 m6">
      <br class="hide-on-med-and-down" />
      <br class="hide-on-med-and-down" />
      <br />
      {#if display}
        <MyProfile />
        <List />
      {/if}
      <br class="hide-on-med-and-down" />
      <br class="hide-on-med-and-down" />
      <br />
		</div>
	</div>
</div>

<GoogleAnalytics measurementId='G-EVMYL6B45R' />

<style>
	.masonry {
		margin: 0;
	}
	.masonry .col {
    height: 100vh;
		position: relative;
    overflow: auto;
	}

	.dotted {
		background-image: radial-gradient(#ddd 20%, transparent 20%), radial-gradient(#ddd 20%, transparent 20%);
    background-color: #eee;
    background-position: 0 0, 50px 50px;
    background-size: 100px 100px;
	}
</style>