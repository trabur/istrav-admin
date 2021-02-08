<script>
  export let domain
  export let state
</script>
<ul class="right">
  <li><a href={`/apps/${domain}/${state}/featured`}><i class="material-icons">star</i></a></li>
  <li><a href={`/apps/${domain}/${state}/categories`}><i class="material-icons">widgets</i></a></li>
  <li><a href={`/apps/${domain}/${state}/products`}><i class="material-icons">shopping_basket</i></a></li>
  <li><a href={`/apps/${domain}/${state}/navigations`}><i class="material-icons">format_list_numbered</i></a></li>
</ul>