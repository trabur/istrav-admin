<script>
  export let domain
  export let state
</script>
<ul class="right">
  <li><a href={`/apps/${domain}/${state}/collections`}><i class="material-icons">apps</i></a></li>
  <li><a href={`/apps/${domain}/${state}/categories`}><i class="material-icons">widgets</i></a></li>
  <li><a href={`/apps/${domain}/${state}/products`}><i class="material-icons">stop</i></a></li>
  <li><a href={`/apps/${domain}/${state}/menus`}><i class="material-icons">format_list_numbered</i></a></li>
  <li><a href={`/apps/${domain}/${state}/pages`}><i class="material-icons">note</i></a></li>
  <li><a href={`/apps/${domain}/${state}/users`}><i class="material-icons">person</i></a></li>
  <li><a href={`/apps/${domain}/${state}/orders`}><i class="material-icons">markunread_mailbox</i></a></li>
</ul>