<script>
  export let domain
  export let state
</script>

<h3 class="title">
  <a href={`/apps/${domain}/${state}`}><i class="material-icons">store</i> {domain}/collections</a>
  <div class="right">
    <i class="material-icons">flag</i> {state}
  </div>
</h3>

<a href={`/apps/${domain}/${state}/collections/add`} class="floating-add btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>

<div class="list">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Item Name</th>
        <th>Item Price</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Alvin</td>
        <td>Eclair</td>
        <td>$0.87</td>
      </tr>
      <tr>
        <td>Alan</td>
        <td>Jellybean</td>
        <td>$3.76</td>
      </tr>
      <tr>
        <td>Jonathan</td>
        <td>Lollipop</td>
        <td>$7.00</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .floating-add {
    position: fixed;
    right: 1em;
    bottom: 1em;
  }
  
  .title {
    padding: 0.5em; 
    font-size: 2rem;
    font-weight: 900;
    background: #333;
    box-shadow: inset 0px 10px 10px -10px #000;
    color: #eee;
    margin: 0;
  }

  .list {
    margin: 0 1em;
  }
</style>