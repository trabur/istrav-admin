<script>
  export let domain
  export let state
</script>
<ul class="right">
  <li><a href={`/edit`}><i class="material-icons">person</i></a></li>
  <li><a href={`/apps/${domain}/${state}/settings/application`}><i class="material-icons">settings</i></a></li>
  <li><a href={`/apps/${domain}/${state}/access/license-key`}><i class="material-icons">power</i></a></li>
</ul>