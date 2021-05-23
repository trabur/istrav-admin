
<script>
  import { onMount } from 'svelte';

  import { istrav, scripts } from '../../../farmerless/api'
  
  import Frame from './Frame.svelte'
  import Status from './Status.svelte'
  import Totals from './Totals.svelte'

	export let domain;
  export let state;
  let app
  let totals

  onMount(async () => {
    let esOne = await scripts.tenant.apps.getOne(null, domain, state)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      app = esOne.payload.data
      console.log('app', app)
    } else {
      alert(esOne.payload.reason)
    }

    // totals
    let esTotals = await scripts.tenant.apps.getTotals(domain, state)
    console.log('esTotals', esTotals)
    if (esTotals.payload.success === true) {
      totals = esTotals.payload.data
      console.log('totals', totals)
    } else {
      alert(esTotals.payload.reason)
    }
  })
</script>

<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m10">
    <h3 class="title">
      <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}</a>
      <div class="right">
        <i class="material-icons">flag</i> {state}
      </div>
    </h3>
    {#if app}
      <div class="card" style="padding: 1em;">
        <div class="masonry">
          <Frame domain={domain} state={state} />
          <Status domain={domain} endpoint={app.endpoint} uploads={app.uploads} />
        </div>
        <hr />
        <Totals domain={domain} state={state} totals={totals} />
        <hr />
        <code>{app.raw}</code>
      </div>
    {/if}
    <!-- <a href={`/apps/${domain}/${state}/edit`} class="waves-effect btn right">EDIT</a> -->
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .title {
    margin: 0 0 0.5em; 
    font-size: 2rem;
    font-weight: 900;
  }

  .masonry {
    width: 100%;
    display: grid;
    grid-template-columns: 320px 1fr;
    grid-gap: 2em;
  }
</style>