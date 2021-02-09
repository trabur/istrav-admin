<script>
  export let domain
  export let demo
  // export let state
</script>

<div class="status">
  <div class="masonry">
    <div>
      <p class="title">demo endpoint:</p>
      <a href={`https://${demo}.dimension.click`} target="_blank" class="waves-effect btn red lighten-2 left">{`${demo}.dimension.click`}</a>
    </div>
    <p>(note: we manage this domain for you; click edit to change.)</p>
    <div>
      <p class="title">application endpoint:</p>
      <a href={`https://${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{domain}</a>
    </div>
    <p>(note: this is your custom domain. checkout the docs here: <a href="https://docs.istrav.com" target="_blank">https://docs.istrav.com</a>.)</p>
  </div>
</div>

<style>
  .status {
    margin-bottom: 0.5em;
  }

  .title {
    font-weight: 800;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .masonry {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
</style>