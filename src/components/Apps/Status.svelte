<script>
  export let domain
  export let endpoint
  export let uploads
  // export let state
</script>

<div class="status">
  <div class="masonry" style="margin-bottom: 1em;">
    <div>
      <p class="title">marketing primary:</p>
      <a href={`https://www.${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{`www.${domain}`}</a>
    </div>
    <div>
      <p class="title">marketing demo:</p>
      <a href={`https://${endpoint}.tyu67.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.tyu67.com`}</a>
    </div>
    
    <div>
      <p class="title">storefront primary:</p>
      <a href={`https://shop.${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{`shop.${domain}`}</a>
    </div>
    <div>
      <p class="title">storefront demo:</p>
      <a href={`https://${endpoint}.dimension.click`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.dimension.click`}</a>
    </div>
    
    <div>
      <p class="title">channel primary:</p>
      <a href={`https://channel.${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{`channel.${domain}`}</a>
    </div>
    <div>
      <p class="title">channel demo:</p>
      <a href={`https://${endpoint}.burnfort.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.burnfort.com`}</a>
    </div>
    
    <div>
      <p class="title">forum primary:</p>
      <a href={`https://forum.${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{`forum.${domain}`}</a>
    </div>
    <div>
      <p class="title">forum demo:</p>
      <a href={`https://${endpoint}.aaghc.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.aaghc.com`}</a>
    </div>

    <div>
      <p class="title">promo primary:</p>
      <a href={`https://promo.${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">{`promo.${domain}`}</a>
    </div>
    <div>
      <p class="title">promo demo:</p>
      <a href={`https://${endpoint}.printedbasics.com`} target="_blank" class="waves-effect btn red lighten-2 left">{`${endpoint}.printedbasics.com`}</a>
    </div>
  </div>
  <p class="title">cdn endpoint:</p>
  <p>{uploads}/...</p>
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