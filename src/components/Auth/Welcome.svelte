<script>
  import { onMount } from "svelte";

	onMount(() => {
		/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
		particlesJS.load('particles-js', './particles.json', function() {
			console.log('callback - particles.js config loaded');
		});
	})
</script>

<div class="welcome card">
	<div id="particles-js">
    <div class="middle">
      <h1 class="logo">METAHEAP.IO</h1>
      <div class="power">Powered by <a href="https://istrav.com">ISTRAV</a></div>
      <br />
      <div class="desc">Welcome to the admin control panel for creating and managing eCommerce solutions (marketing, storefronts, blogs, fulfillment, and promo) built for website owners. Getting started is FREE; in minutes, be up and running with your very own production ready website in just a few clicks.</div>
      <br />
      <a href="https://docs.istrav.com" target="_blank" class="waves-effect btn">DOCUMENTATION</a>
    </div>
  </div>
</div>

<style>
  .logo {
    font-size: 3em;
    color: #333;
    font-weight: 800;
    margin: 0;
  }

  .welcome {
    height: 100vh;
    margin: 0;
    color: #333;
    font-weight: bold;
  }

  .middle {
    padding: 1em;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .power a {
    text-decoration: underline;
  }

  .desc {
    font-size: 1.3em;
  }

	#particles-js {
		background-color: #ee6e73;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
