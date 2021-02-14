<script>
  export let domain
  export let state
  export let totals
  // export let state
</script>

{#if totals}
  <div class="masonry">
    <a href={`/apps/${domain}/${state}/collections`} class="waves-effect btn red lighten-2 left">collections ({totals.collectionsCount})</a>
    <a href={`/apps/${domain}/${state}/categories`} class="waves-effect btn red lighten-2 left">categories ({totals.categoriesCount})</a>
    <a href={`/apps/${domain}/${state}/products`} class="waves-effect btn red lighten-2 left">products ({totals.productsCount})</a>
    <a href={`/apps/${domain}/${state}/menus`} class="waves-effect btn red lighten-2 left">menus ({totals.menusCount})</a>
    <a href={`/apps/${domain}/${state}/pages`} class="waves-effect btn red lighten-2 left">pages ({totals.pagesCount})</a>
    <a href={`/apps/${domain}/${state}/users`} class="waves-effect btn red lighten-2 left">users ({totals.usersCount})</a>
    <a href={`/apps/${domain}/${state}/orders`} class="waves-effect btn red lighten-2 left">orders ({totals.ordersCount})</a>
  </div>
{/if}

<style>

  .masonry {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
  }
</style>