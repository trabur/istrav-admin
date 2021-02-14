<script>
  export let domain
  export let endpoint
  // export let state
</script>

<div class="status">
  <div class="masonry">
    <div>
      <p class="title">main endpoint:</p>
      <a href={`https://${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{domain}</a>
    </div>
    <div>
      <p class="title">storefront endpoint:</p>
      <a href={`https://${endpoint}.dimension.click`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.dimension.click`}</a>
    </div>
    <div>
      <p class="title">customer endpoint:</p>
      <a href={`https://${endpoint}.farmerless.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.farmerless.com`}</a>
    </div>
    <div>
      <p class="title">employee endpoint:</p>
      <a href={`https://${endpoint}.burnfort.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.burnfort.com`}</a>
    </div>
  </div>
  <br />
  <p>(note: for managing your domain... checkout the docs here: <a href="https://docs.istrav.com" target="_blank">https://docs.istrav.com</a>.)</p>
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