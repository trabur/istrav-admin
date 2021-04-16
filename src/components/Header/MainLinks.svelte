<script>
  export let domain
  export let state
</script>
<ul class="right">
  <li><a href={`/apps/${domain}/${state}/access/license-key`}><i class="material-icons">power</i></a></li>
  <li><a href={`/apps/${domain}/${state}/settings/application`}><i class="material-icons">settings</i></a></li>
  <li><a href={`/apps/${domain}/${state}/event-sorces/notifications`}><i class="material-icons" style="float: left;">event_note</i> <span class="new badge white" style="color: black; font-size: 1.2em;">4</span></a></li>
</ul>