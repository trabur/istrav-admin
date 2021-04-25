<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte'
  import Sidebar from './Sidebar.svelte'
  
  export let domainId
  export let stateId

  let appId
  let loading = false
  let domain = ''
  let state = ''
  let token
  let key
  let hostId
  let hostDomain
  let records = []

  onMount(async () => {
    M.updateTextFields();

    token = localStorage.getItem('token')

    // load licenseKey from app
    let esOne = await scripts.tenant.apps.getOne(token, domainId, stateId)
    console.log('esOne', esOne)
    if (esOne.payload.success === true) {
      let app = esOne.payload.data
      console.log('app', app)
      domain = app.domain
      state = app.state
      appId = app.id
      key = app.licenseKey
      setTimeout(() => M.updateTextFields(), 0)
      
      // then load licenseKey details
      appByKey() 
    } else {
      alert(esOne.payload.reason)
    }
  })

  async function appByKey () {
    if (key) {
      // fetch license
      let esLicense = await scripts.subscription.licenses.getOne(key)
      console.log('esLicense', esLicense)
      if (esLicense.payload.success === true) {
        let data = esLicense.payload.data
        key = data.key
        hostId = data.appId
        if (data.app) {
          hostDomain = data.app.domain
        }

        checkDNSRecords(getRecords())
      } else {
        alert(esLicense.payload.reason)
      }
    } else {
      hostId = null
    }
  }

  function checkServerStatus (index, domain) {
    records[index].working = null
    var img = document.body.appendChild(document.createElement("img"))
    img.onload = function () {
      records[index].working = true
    }
    img.onerror = function () {
      records[index].working = false
    }
    img.src = `https://${domain}/poweredByISTRAV.png`
  }

  function getRecords () {
    return records = [
      {
        type: 'CNAME',
        name: 'dns',
        content: `dns.${hostDomain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'headless',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'api',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'io',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'admin',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'www',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'shop',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'channel',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'forum',
        content: `dns.${domain}`,
        working: null
      },
      {
        type: 'CNAME',
        name: 'promo',
        content: `dns.${domain}`,
        working: null
      },
    ]
  }

  function checkDNSRecords (records) {
    records.forEach((value, index) => {
      checkServerStatus(index, `${value.name}.${domain}`)
    })
  }
</script>

<Header domain={domainId} state={stateId} />
<div class="row">
  <div class="col s12 m1"></div>
  <div class="col s12 m3">
    {#if hostId}
      <Sidebar domain={domainId} state={stateId} hostId={hostId} />
    {:else}
      <Sidebar domain={domainId} state={stateId} />
    {/if}
  </div>
  <div class="col s12 m7">
    <h3 class="title">DNS Records</h3>
    <div class="card" style="padding: 1em;">
      <div class="row">
        <div class="input-field col s12">
          <h5>Host Id:</h5>
          <p>{hostId}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Content</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            {#each records as record}
              <tr>
                <td>{record.type}</td>
                <td>{record.name}</td>
                <td>{record.content}</td>
                <td>
                  {
                    record.working === null 
                      ? 'pending'
                      : record.working ? 'verified' : 'invalid'
                  }
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <br />
        <div style="padding: 0 1em;">(DNS records are verified by looking for a file named "poweredByISTRAV.png" that is located in the root directory of our application. Checks should return valid if these DNS Records and your application's Domain Name are set properly.)</div>
        <br />
        <button target="_blank" style="margin-left: 1em;" class="waves-effect btn" on:click={() => checkDNSRecords(getRecords())}>Check DNS Records</button>
      </div>
    </div>
  </div>
  <div class="col s12 m1"></div>
</div>

<style>
  .title {
    margin: 0; 
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
  }
</style>