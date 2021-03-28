<script>
  export let domain
  export let state
</script>
<ul class="right">
  <li><a href={`/edit`}><i class="material-icons">person</i></a></li>
  <li><a href={`/apps/${domain}/${state}/edit`}><i class="material-icons">settings</i></a></li>
  <li><a href={`/apps/${domain}/${state}/access`}><i class="material-icons">vpn_key</i></a></li>
</ul>