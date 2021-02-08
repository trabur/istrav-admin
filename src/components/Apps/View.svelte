
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

    </div>
    <Delete domain={domain} state={state}/>
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