<script>
  export let showWiring
</script>

<header class={showWiring ? 'wire' : ''}>
  <div class="middle">
    <div class={showWiring ? 'logo wire' : 'logo'}>
      <slot name="logo">hello logo</slot>
    </div>
    <div class={showWiring ? 'slogan wire' : 'slogan'}>
      <slot name="slogan"></slot>
    </div>
  </div>
</header>
<div class={showWiring ? 'wire navigation' : 'navigation'}>
  <slot name="navigation"></slot>
</div>
<div class="row">
  <div class="col s12 m2"></div>
  <div class="col s12 m8">
    <article class={showWiring ? 'wire' : ''}>
      <slot name="article"></slot>
    </article>
  </div>
  <div class="col s12 m2"></div>
</div>
<main class={showWiring ? 'wire' : ''}>
  <slot name="main"></slot>
</main>
<footer class={showWiring ? 'wire' : ''}>
  <slot name="footer"></slot>
</footer>

<style>
  header {
    min-height: 100vh !important;
    position: relative;
  }

  .wire {
    border: 3px dashed #ccc;
    padding: 0.1em;
    margin: 0.1em;
    min-height: 5em;
  }

  .middle {
    right: 0;
    left: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
  }
</style>