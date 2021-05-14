<script>
  import Delete from '../Delete.svelte'

  export let domain
  export let state
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']
</script>

<div class="row">
  <div class="col s0 m1"></div>
  <div class="col s12 m10">
    <h3 class="header">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; overflow: hidden; background-color: #ccc;">
      <a href={`/apps/${domain}/${state}`} class="waves-effect btn" style="float: left; margin-right: 0.5em;">⟵ BACK</a>
      <h3 class="path">/settings</h3>
      <div style="text-align: right;">
        <Delete domain={domain} state={state}/>
        <a href={`/apps/${domain}/${state}/settings`} class="waves-effect btn right teal" style="margin-right: 1em;"><i class="navicon material-icons">settings</i></a>
        <a href={`/apps/${domain}/${state}/open-source`} class="waves-effect btn right teal" style="margin-right: 1em;"><i class="navicon material-icons">power</i></a>
        <a href={`/apps/${domain}/${state}/identification-access-management`} class="waves-effect btn right teal" style="margin-right: 1em;"><i class="navicon material-icons">security</i></a>
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