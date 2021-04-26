<script>
  export let domain
  export let state
</script>

<ul class="right">
  <li><a href={`/apps/${domain}/${state}/settings`}><i class="material-icons">power_settings_new</i></a></li>
  <!-- <li><a href={`/apps/${domain}/${state}/access/license-key`}><i class="material-icons">power</i></a></li>
  <li><a href={`/apps/${domain}/${state}/settings/application`}><i class="material-icons">settings</i></a></li>
  <li><a href={`/apps/${domain}/${state}/appearance/theme`}><i class="material-icons">brush</i></a></li> -->
  <li><a href={`/apps/${domain}/${state}/notifications`}><i class="material-icons" style="float: left;">notifications</i> <span class="new badge white" style="color: black; font-size: 1.2em;">1</span></a></li>
  <li><a href={`/apps/${domain}/${state}/event-sorces`}><i class="material-icons" style="float: left;">event_note</i> <span class="new badge white" style="color: black; font-size: 1.2em;">4</span></a></li>
</ul>