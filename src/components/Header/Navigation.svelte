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
  <div class="nav-wrapper teal">
    {#if token}
      <a href="/apps" class="brand-logo left" style="margin-left: 0.5em;"><i class="material-icons">lock_open</i> METAHEAP</a>
    {:else}
      <a href="/" class="brand-logo left" style="margin-left: 0.5em;"><i class="material-icons">lock_outline</i> METAHEAP</a>
    {/if}
    <slot></slot>
  </div>
</nav>

