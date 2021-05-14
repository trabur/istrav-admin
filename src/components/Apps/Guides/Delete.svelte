
<script>

  export let state;
  export let domain;
	export let appId;
  export let slug;
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']
  
  function areYouSure() {
    var confirmDelete = prompt(`Are you sure that you want to delete the "${slug}" guide? Please renter quotation to confirm.`, "");
    if (confirmDelete === `${slug}`) {
      alert('Confirm delete success. The guide will be removed.')
      remove()
    } else {
      alert('Confirm delete mismatch. The guide will not be removed.')
    }
  }

  async function remove() {
    let token = localStorage.getItem('token')
    let esDelete = await scripts.channel.guides.getRemove(appId, token, slug)
    console.log('esDelete', esDelete)
    if (esDelete.payload.success === true) {
      window.location.href = `/apps/${domain}/${state}/guides`
    } else {
      alert(esDelete.payload.reason)
    }
  }
</script>

<button class="waves-effect btn right red lighten-2" on:click={() => areYouSure()}>DELETE</button>