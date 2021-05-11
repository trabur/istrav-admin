<script>
  export let domain
  export let state
  export let item
</script>

{#if item}
  name: {item.name}<br />
  component: {item.component}<br />
  <a href={`/apps/${domain}/${state}/blocks/${item.slug}`}>(edit)</a>
{/if}