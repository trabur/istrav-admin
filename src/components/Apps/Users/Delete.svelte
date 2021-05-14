
<script>
  export let state;
  export let domain;
	export let appId;
  export let username;
  let scripts = window['scripts']
  let M = window['M']
  let Choices = window['Choices']
  
  function areYouSure() {
    var confirmDelete = prompt(`Are you sure that you want to delete the "${username}" user? Please renter quotation to confirm.`, "");
    if (confirmDelete === `${username}`) {
      alert('Confirm delete success. The user will be removed.')
      remove()
    } else {
      alert('Confirm delete mismatch. The user will not be removed.')
    }
  }

  async function remove() {
    let token = localStorage.getItem('token')
    let esDelete = await scripts.account.users.getRemove(appId, token, username)
    console.log('esDelete', esDelete)
    if (esDelete.payload.success === true) {
      window.location.href = `/apps/${domain}/${state}/users`
    } else {
      alert(esDelete.payload.reason)
    }
  }
</script>

<button class="waves-effect btn right red lighten-2" on:click={() => areYouSure()}>DELETE</button>