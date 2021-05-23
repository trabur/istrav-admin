
<script>
  import { istrav, scripts } from '../../../farmerless/api'

	export let domain;
  export let state;
  
  function areYouSure() {
    var confirmDelete = prompt(`Are you sure that you want to delete the "${domain}:${state}" application? Please renter quotation to confirm.`, "");
    if (confirmDelete === `${domain}:${state}`) {
      alert('Confirm delete success. The application will be removed.')
      remove()
    } else {
      alert('Confirm delete mismatch. The application will not be removed.')
    }
  }

  async function remove() {
    let token = localStorage.getItem('token')
    let esDelete = await scripts.tenant.apps.getRemove(token, domain, state)
    console.log('esDelete', esDelete)
    if (esDelete.payload.success === true) {
      window.location.href = '/apps'
    } else {
      alert(esDelete.payload.reason)
    }
  }
</script>

<button class="waves-effect btn right red lighten-2" on:click={() => areYouSure()}>DELETE</button>