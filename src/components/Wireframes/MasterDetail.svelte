<script>
  export let showWiring
</script>

<header>
  <div class={showWiring ? 'logo wire' : 'logo'}>
    <slot name="logo"></slot>
  </div>
  <div class={showWiring ? 'slogan wire' : 'slogan'}>
    <slot name="slogan"></slot>
  </div>
</header>
<nav class={showWiring ? 'wire' : ''}>
  <slot name="navigation"></slot>
</nav>
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    <aside class={showWiring ? 'wire' : ''}>
      <slot name="aside"></slot>
    </aside>
  </div>
  <div class="col s12 m7">
    <article class={showWiring ? 'wire' : ''}>
      <slot name="article"></slot>
    </article>
  </div>
  <div class="col s12 m1"></div>
</div>
<main class={showWiring ? 'wire' : ''}>
  <slot name="main"></slot>
</main>
<footer class={showWiring ? 'wire' : ''}>
  <slot name="footer"></slot>
</footer>

<style>
  .wire {
    border: 3px dashed #ccc;
    padding: 0.1em;
    margin: 0.1em;
    min-height: 5em;
  }
</style>