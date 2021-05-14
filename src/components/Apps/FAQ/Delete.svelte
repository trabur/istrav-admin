
<script>
  export let state;
  export let domain;
	export let appId;
  export let slug;
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']
  
  function areYouSure() {
    var confirmDelete = prompt(`Are you sure that you want to delete the "${slug}" FAQ? Please renter quotation to confirm.`, "");
    if (confirmDelete === `${slug}`) {
      alert('Confirm delete success. The FAQ will be removed.')
      remove()
    } else {
      alert('Confirm delete mismatch. The FAQ will not be removed.')
    }
  }

  async function remove() {
    let token = localStorage.getItem('token')
    let esDelete = await scripts.app.faq.getRemove(appId, token, slug)
    console.log('esDelete', esDelete)
    if (esDelete.payload.success === true) {
      window.location.href = `/apps/${domain}/${state}/faq`
    } else {
      alert(esDelete.payload.reason)
    }
  }
</script>

<button class="waves-effect btn right red lighten-2" on:click={() => areYouSure()}>DELETE</button>