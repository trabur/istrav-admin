<script>
  export let showWiring
</script>

<header class={showWiring ? 'wire' : ''}>
  {#if showWiring}
    <div class="name">header</div>
  {/if}
  <div class="row wrapper">
    <div class="col wrapper s12 m6">
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
    <div class="col wrapper s12 m6">
      <div class={showWiring ? 'controls wire' : 'controls'}>
        {#if showWiring}
          <div class="name">controls</div>
        {/if}
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</header>
<div class={showWiring ? 'navigation wire' : 'navigation'}>
  {#if showWiring}
    <div class="name">navigation</div>
  {/if}
  <slot name="navigation"></slot>
</div>
<div class="row wrapper">
  <div class="col wrapper s12 m1"></div>
  <div class="col wrapper s12 m3">
    <aside class={showWiring ? 'wire' : ''}>
      {#if showWiring}
        <div class="name">aside</div>
      {/if}
      <slot name="aside"></slot>
    </aside>
  </div>
  <div class="col wrapper s12 m7">
    <article class={showWiring ? 'wire' : ''}>
      {#if showWiring}
        <div class="name">article</div>
      {/if}
      <slot name="article"></slot>
    </article>
  </div>
  <div class="col wrapper s12 m1"></div>
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
  .wire {
    border: 3px dashed #ccc;
    padding: 0.1em;
    margin: 0.1em;
    min-height: 5em;
    position: relative;
  }

  .wrapper {
    margin: 0;
    padding: 0;
  }

  .name {
    position: absolute;
    top: 0;
    left: 0;
    color: #ccc;
    border: 3px dashed #ccc;
    border-left: 0;
    border-top: 0;
    padding: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
  }

  header.wire,
  .controls.wire,
  .logo.wire,
  .slogan.wire,
  article.wire,
  aside.wire,
  main.wire,
  footer.wire,
  .navigation.wire {
    padding-top: 2.2em;
  }
</style>