<script>
  export let domain
  export let endpoint
  export let uploads
  // export let state
</script>

<div class="status">
  <div class="masonry" style="margin-bottom: 1em;">
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
  <p class="title">cdn endpoint:</p>
  <p>https://rawcdn.githack.com/{uploads}/...</p>
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