<script>
  // import { login } from './methods'
  import { onMount } from 'svelte';

  let list

  onMount(async () => {
    let token = localStorage.getItem('token')

    let esAll = await scripts.tenant.apps.getAll(token)
    console.log('esAll', esAll)
    if (esAll.payload.success === true) {
      console.log('apps', esAll.payload.data)
      list = esAll.payload.data
    } else {
      alert(esAll.payload.reason)
    }
  })
</script>

{JSON.stringify(list, null, 2)}

