
<script>
  
  import { istrav, scripts } from '../../../../farmerless/api'
  
  export let state;
  export let domain;
	export let appId;
  export let slug;
  
  function areYouSure() {
    var confirmDelete = prompt(`Are you sure that you want to delete the "${slug}" block? Please renter quotation to confirm.`, "");
    if (confirmDelete === `${slug}`) {
      alert('Confirm delete success. The block will be removed.')
      remove()
    } else {
      alert('Confirm delete mismatch. The block will not be removed.')
    }
  }

  async function remove() {
    let token = localStorage.getItem('token')
    let esDelete = await scripts.app.blocks.getRemove(appId, token, slug)
    console.log('esDelete', esDelete)
    if (esDelete.payload.success === true) {
      window.location.href = `/apps/${domain}/${state}/blocks`
    } else {
      alert(esDelete.payload.reason)
    }
  }
</script>

<button class="waves-effect btn right red lighten-2" on:click={() => areYouSure()}>DELETE</button>