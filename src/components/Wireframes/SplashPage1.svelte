<script>
  export let showWiring
</script>

<header class={showWiring ? 'wire' : ''}>
  {#if showWiring}
    <div class="name">header</div>
  {/if}
  <div class="middle">
    <div class={showWiring ? 'logo wire' : 'logo'}>
      {#if showWiring}
        <div class="name">logo</div>
      {/if}
      <slot name="logo"></slot>
    </div>
    <div class={showWiring ? 'slogan wire' : 'slogan'}>
      {#if showWiring}
        <div class="name">slogan</div>
      {/if}
      <slot name="slogan"></slot>
    </div>
  </div>
</header>
<div class={showWiring ? 'wire navigation' : 'navigation'}>
  {#if showWiring}
    <div class="name">navigation</div>
  {/if}
  <slot name="navigation"></slot>
</div>
<div class="row wrapper">
  <div class="col s12 m2"></div>
  <div class="col s12 m8">
    <article class={showWiring ? 'wire' : ''}>
      {#if showWiring}
        <div class="name">article</div>
      {/if}
      <slot name="article"></slot>
    </article>
  </div>
  <div class="col s12 m2"></div>
</div>
<main class={showWiring ? 'wire' : ''}>
  {#if showWiring}
    <div class="name">main</div>
  {/if}
  <slot name="main"></slot>
</main>
<footer class={showWiring ? 'wire' : ''}>
  {#if showWiring}
    <div class="name">footer</div>
  {/if}
  <slot name="footer"></slot>
</footer>

<style>
  header {
    min-height: 100vh !important;
    position: relative;
  }

  .wire {
    border: 1px dashed #000;
    padding: 0.2em;
    margin: 0.2em;
    min-height: 5em;
    position: relative;
  }

  .wrapper {
    margin: 0;
    min-height: 0;
  }

  .name {
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    border: 1px dashed #000;
    border-left: 0;
    border-top: 0;
    padding: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
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

  header.wire,
  .logo.wire,
  .slogan.wire,
  .navigation.wire,
  article.wire,
  footer.wire,
  main.wire {
    padding-top: 2.2em;
  }
</style>