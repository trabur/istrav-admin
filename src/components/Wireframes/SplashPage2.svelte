<script>
  export let showWiring
</script>

<header class={showWiring ? 'wire' : ''}>
  {#if showWiring}
    <div class="name">header</div>
  {/if}
  <div class="row wrapper">
    <div class="contain col s12 m6">
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
        <article class={showWiring ? 'wire' : ''}>
          {#if showWiring}
            <div class="name">article</div>
          {/if}
          <slot name="article"></slot>
        </article>
        <footer class={showWiring ? 'wire' : ''}>
          {#if showWiring}
            <div class="name">footer</div>
          {/if}
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
    <div class="contain col s12 m6">
      <div class="middle">
        <aside class={showWiring ? 'wire' : ''}>
          {#if showWiring}
            <div class="name">main</div>
          {/if}
          <slot name="main"></slot>
        </aside>
      </div>
    </div>
  </div>
</header>

<style>
  header {
    height: 100vh;
  }
  
  .wrapper {
    margin: 0;
    position: relative;
    height: 100%;
    padding: 0;
    min-height: 0;
  }

  .contain {
    position: relative;
    height: 100%;
  }

  .logo {
    text-align: center;
  }
  
  .wire {
    border: 3px dashed #ccc;
    padding: 0.2em;
    margin: 0.2em;
    min-height: 5em;
    position: relative;
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
  .logo.wire,
  .slogan.wire,
  article.wire,
  footer.wire,
  aside.wire {
    padding-top: 2.2em;
  }
</style>