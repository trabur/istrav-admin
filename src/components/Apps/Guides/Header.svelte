<script>
  import Delete from './Delete.svelte'

  export let appId
  export let domain
  export let state
  export let slug
  export let endpoint
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/guides</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}/guides`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/{slug}</h3>
      <div style="text-align: right;">
        <Delete appId={appId} slug={slug} domain={domain} state={state} />
        <a href={`http://${endpoint}.tyu67.com/guides/${slug}`} class="waves-effect btn right teal" style="margin-right: 1em;" target="_blank"><i class="navicon material-icons">public</i></a>
      </div>
    </div>
  </div>
  <div class="col s0 m1"></div>
</div>

<style>
  .header {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .path {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    float: left;
    color: #555;
    line-height: 1.5em;
  }
</style>