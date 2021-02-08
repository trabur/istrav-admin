
<script>
  import { onMount } from 'svelte';
  import Delete from './Delete.svelte'

	export let domain;
  export let state;
</script>

<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <i class="material-icons">store</i> {domain}
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <hr />
    </div>
    {#if state === 'production'}
      <a href={`https://${domain}`} target="_blank" class="waves-effect btn red lighten-2 left">LIVE</a>
    {:else}
      <a href={`/apps/${domain}/production`} class="waves-effect btn left">PROD</a>
    {/if}
    <Delete domain={domain} state={state}/>
    <a href={`/apps/${domain}/${state}/edit`} class="waves-effect btn right" style="margin-right: 0.5em;">EDIT</a>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .title {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }
</style>