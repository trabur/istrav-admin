<script>
  export let showWiring
</script>

<div class="row wrapper">
  <div class="col s12 m6">
    <header class={showWiring ? 'wire' : ''}>
      <div class={showWiring ? 'logo wire' : 'logo'}>
        <slot name="logo"></slot>
      </div>
      <article class={showWiring ? 'wire' : ''}>
        <slot name="article"></slot>
      </article>
      <footer class={showWiring ? 'wire' : ''}>
        <slot name="footer"></slot>
      </footer>
    </header>
  </div>
  <div class="col s12 m6">
    <aside class={showWiring ? 'wire' : ''}>
      <slot name="main"></slot>
    </aside>
  </div>
</div>

<style>
  .wrapper {
    margin: 0;
  }

  .logo {
    text-align: center;
  }
  
  .wire {
    border: 3px dashed #ccc;
    padding: 0.1em;
    margin: 0.1em;
    min-height: 5em;
  }
</style>