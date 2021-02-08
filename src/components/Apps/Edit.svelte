<script>
  import { onMount } from 'svelte';
  export let domain
  export let state

  function submit() {
    console.log('edit')
  }

  onMount(() => {
    M.updateTextFields();
  })
</script>

<div class="row">
  <div class="col s12 m4"></div>
  <div class="col s12 m4">
    <h3 class="title">EDIT APP</h3>
    <div class="card" style="padding: 1em; background: #eee;">
      <div class="row" style="margin-bottom: 0;">
        <div class="input-field col s12">
          <i class="material-icons prefix">store</i>
          <input id="icon_prefix" type="text" class="validate" value={domain}>
          <label for="icon_prefix">Domain Name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">flag</i>
          <input id="icon_telephone" type="tel" class="validate" value={state}>
          <label for="icon_telephone">State</label>
        </div>
      </div>
    </div>
    <button class="waves-effect btn red lighten-2 right" on:click={() => submit()}>SAVE</button>
    <a href={`/apps/${domain}/${state}`} class="waves-effect btn right" style="margin-right: 0.5em;">CANCEL</a>
  </div>
  <div class="col s12 m4"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>