<script>
  import Modal from './Modal.svelte'
  import { user_id, email, tier } from "./helpers/store.js"
  import { onMount } from 'svelte'
  import { nanoid } from 'nanoid'
  import MenuBar from './MenuBar.svelte'
  import { getJSON, postJSON } from "./helpers/api.js"
  import { isEmail, isValidWebsite } from "./helpers/validation.js"
  import { SvelteEasyToast, toast } from 'svelte-easy-toast';

  export let name
  export let totalSubmissions = 0;

  let isOpenModal = false;
  let isOpenModal2 = false;

  let selectedEndpointId;
  let endpoints = [];
  let submissions = null; // null = loading, [] = loaded but empty, [..] = data

  let newEndpointName;
  let headers = [];
  let rows = [];
  let errorMessage = '';
  let selected = [];
  let csvStream = '';

  function openModal() {
    if ($tier == 0 && endpoints.length > 0) {
      errorMessage = "You are limited to 1 form on the free tier. Please upgrade to enjoy premium features."
    } else {
      isOpenModal = true;
    }
  }

  function closeModal() {
    isOpenModal = false;
    newEndpointName = '';
  }

  function openModal2() {
    isOpenModal2 = true;
  }

  function closeModal2() {
    isOpenModal2 = false;
  }

  function deleteSubmissions() { 
    let payload = {}
    let idsToDelete = selected.map(s => s[0])

    postJSON(`delete-submissions/${idsToDelete}`, payload, () => {
      submissions = null;
      getJSON('submissions/' + selectedEndpointId, (data) => {
        submissions = data;

        toast({
          type: 'success',
          position: 'top-center',
          text: 'Forms Deleted',
          title: 'Success',
        });
      });

      selected = [];
    })
  }

  function toggleAll(e) {
    selected = e.target.checked ? [...rows] : [];
  }

  $: {
    headers = [];
    rows = [];
    csvStream = '';

    if (submissions && submissions.length > 0) {
      for (let i = 0; i < submissions.length; i++) {
        let columns = [];
        headers[0] = 'id';
        columns[0] = submissions[i].id;

        headers[1] = 'date created';
        columns[1] = submissions[i].created_at;

        Object.entries(submissions[i].form_data).forEach(([key, value]) => {
          if (headers.indexOf(key) === -1) {
            headers = [...headers, key];
          }

          let col = headers.indexOf(key);
          columns[col] = value;
          rows[i] = columns;
        });
      }

      csvStream = headers.join(', ') + '\n' + rows.join(', ') + '\n';
    }
  }

  onMount(() => {
    getJSON(`endpoints/${$user_id}`, (data) => {
      endpoints = data;
    });

    getJSON(`submissions-count/${$user_id}`, (data) => {
      totalSubmissions = data.totalSubmissions;
    });
  });

  function saveEndpoint() {
    let id = nanoid(7);
    let message = 'Thanks for submitting the form';
    let endpoint = { id, name: newEndpointName, message };

    endpoints = [...endpoints, endpoint];

    postJSON(`endpoints/${$user_id}`, endpoint, () => {});
  }

  function changeEndpoint(id) {
    selectedEndpointId = id;
    submissions = null;

    getJSON('submissions/' + id, (data) => {
      submissions = data;
    });
  }
</script>

<main>

  {#if $tier == 0}
    <section class="section">
      <div class="container">
        <div class="notification alert">
          <strong>Limited-time offer:</strong>
          $59 for lifetime Pro access.
          <a href="https://buy.stripe.com/cN24hWaHzadp0jCbIS" target="_blank">
            <strong>Buy once and use forever</strong>
          </a>
        </div>
      </div>
    </section>
  {/if}

  <div class="container">

    {#if errorMessage}      
      <div class="notification is-warning">{errorMessage}</div>
    {/if}

    <h1 class="title has-text-centered">Forms</h1>

    <div class="columns">
      <div class="column is-one-fifth">

        <!-- Sidebar -->
        <aside class="menu box p-4">
          <p class="menu-label">Forms</p>

          <!-- Primary Create Form button -->
          <button 
            class="button is-primary is-fullwidth mb-3"
            on:click={openModal}
          >
            + Create Form
          </button>

          {#if endpoints.length === 0}
            <!-- World-class empty state for no forms -->
            <div class="empty-state">
              <svg width="140" height="140" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#d0d0d0" stroke-width="1.5"/>
                <rect x="6" y="8" width="12" height="1.5" fill="#d0d0d0"/>
                <rect x="6" y="12" width="10" height="1.5" fill="#d0d0d0"/>
                <rect x="6" y="16" width="8" height="1.5" fill="#d0d0d0"/>
              </svg>

              <p class="empty-title">You haven’t created any forms yet</p>
              <p class="empty-sub">Start by creating your first form — it only takes a moment.</p>
            </div>
          {:else}
            <!-- Card-style form list -->
            <ul class="menu-list form-list">
              {#each endpoints as {id, name}}
                <li>
                  <a 
                    class:selected={id === selectedEndpointId}
                    on:click={() => changeEndpoint(id)}
                  >
                    {name}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}

          {#if $tier == 0}
            <div class="mt-5 has-text-centered">
              <a target="_blank" href="https://buy.stripe.com/cN24hWaHzadp0jCbIS">
                <img src="/img/pricing.png">
              </a>
            </div>
          {/if}
        </aside>

        {#if $tier == 0}
          <progress class="progress is-link" value="{totalSubmissions}" max="50"></progress>
          <p>{totalSubmissions} of 50 form submission limit</p>
          <p>{totalSubmissions / 50 * 100}% used</p>
        {/if}

      </div>

      <div class="column">

        {#if selectedEndpointId}
          <MenuBar id={selectedEndpointId} hideHomeButton={true} />
          <h1 class="m-3 has-text-centered has-text-weight-bold">Form ID: {selectedEndpointId}</h1>

          {#if submissions === null}
            <!-- True loading state -->
            <p class="subtitle has-text-centered my-5">Loading…</p>

          {:else if submissions.length === 0}
            <!-- World-class empty state for no submissions -->
            <div class="empty-state mt-6">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#d0d0d0" stroke-width="1.5"/>
                <path d="M3 10h18" stroke="#d0d0d0" stroke-width="1.5"/>
                <rect x="7" y="14" width="10" height="2" rx="1" fill="#d0d0d0"/>
              </svg>

              <p class="empty-title">No submissions yet</p>
              <p class="empty-sub">Share your form link to start collecting responses.</p>
            </div>

          {:else}
            <!-- Submissions table -->
            <table class="table is-striped is-hoverable">
              <tr>
                <td colspan="3" class="has-text-right">
                  <p>
                    <b>({rows.length})</b> form submissions
                    <a 
                      class="button is-link is-small" 
                      download="fabform-submissions.csv" 
                      href="data:application/octet-stream,{encodeURI(csvStream)}"
                    >
                      Download Submissions CSV
                    </a>
                  </p>
                </td>
              </tr>

              <div class="checkbox m-5">
                <label>
                  {selected.length} 
                  <input 
                    type="checkbox" 
                    on:change={toggleAll} 
                    checked={selected.length === rows.length} 
                  /> items selected 
                </label>
              </div>

              <tbody>
                <tr>
                  {#each headers as header }
                    <th>{header}</th>
                  {/each} 
                </tr>

                {#each rows as row, r}
                  <tr>
                    {#each headers as header, i}
                      {#if i == 0}
                        <div class="m-2 checkbox">
                          <label>
                            <input 
                              type="checkbox" 
                              bind:group={selected} 
                              name={row} 
                              value={row}  
                            />
                            {row[i]}
                          </label>
                        </div>
                      {:else}
                        {#if isEmail(row[i])}
                          <td><a href="mailto:{row[i]}">{row[i]}</a></td>
                        {:else if isValidWebsite(row[i])}
                          <td><a target="blank" href="{row[i]}">{row[i]}</a></td>
                        {:else}
                          <td>{row[i] || ''}</td>
                        {/if}
                      {/if}
                    {/each}
                  </tr>
                {/each}
              </tbody>
            </table>

            <Modal 
              isOpenModal={isOpenModal2} 
              on:closeModal={closeModal2} 
              on:success={deleteSubmissions} 
              title="Are you sure you want to delete the form submissions?" 
              buttonText="Delete form submissions"
            />

            <button 
              disabled={selected == 0} 
              class="button is-danger" 
              on:click={openModal2}
            >
              Delete Form Submissions
            </button>
          {/if}
        {/if}

        <Modal 
          isOpenModal={isOpenModal} 
          on:closeModal={closeModal} 
          on:success={saveEndpoint} 
          title="Create Form" 
          buttonText="Save Form"
        >
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input 
                class="input" 
                type="text" 
                bind:value={newEndpointName} 
                placeholder="Give your form a name"
              >
            </div>
          </div>
        </Modal>

      </div>
    </div>
  </div>

</main>

<style>
  a {  
    text-decoration: none;
  }

  .alert {
    background-color: #ffdd57;
    color: #363636;
    padding: 1.5rem;
    border-radius: 5px;
    border: 2px solid #ffcc00;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
  }

  .alert a {
    color: #3273dc;
    text-decoration: underline;
  }

  /* Card-style form list items */
  .form-list a {
    display: block;
    padding: 0.85rem 1rem;
    margin-bottom: 0.6rem;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    background: #fafafa;
    transition: all 0.18s ease;
    color: #363636;
    font-weight: 500;
  }

  .form-list a:hover {
    background: white;
    border-color: #cfcfcf;
    transform: translateY(-1px);
  }

  .form-list a.selected {
    background: #3273dc;
    color: white;
    border-color: #3273dc;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(50, 115, 220, 0.25);
  }

  /* Premium empty state styling */
  .empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
    opacity: 0.9;
  }

  .empty-state svg {
    opacity: 0.85;
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4a4a;
  }

  .empty-sub {
    font-size: 0.95rem;
    color: #7a7a7a;
    margin-top: 0.25rem;
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

