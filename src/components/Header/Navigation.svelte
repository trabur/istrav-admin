<script>
  import { onMount } from 'svelte';
  
  // navigation center text
  let token = null

	onMount(() => {
    // user
		token = localStorage.getItem('token')
  })
</script>

<nav>
  <div class="nav-wrapper">
    {#if token}
      <a href="/apps" class="brand-logo left" style="margin-left: 0.5em;"><i class="material-icons">lock_open</i> ISTRAV</a>
    {:else}
      <a href="/" class="brand-logo left" style="margin-left: 0.5em;"><i class="material-icons">lock_outline</i> ISTRAV</a>
    {/if}
    <ul class="right">
      {#if token}
        <li><a href="/logout"><i class="material-icons">logout</i></a></li>
      {:else}
        <!-- <li><a href="/login"><i class="material-icons">person</i></a></li> -->
      {/if}
    </ul>
  </div>
</nav>

