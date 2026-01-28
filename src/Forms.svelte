<script>
import Modal from  './Modal.svelte'
import {user_id,email,tier} from "./helpers/store.js"
import { onMount } from 'svelte'
import { nanoid } from 'nanoid'
import {router} from 'tinro';
import MenuBar from  './MenuBar.svelte'
import {getJSON,postJSON} from "./helpers/api.js"
import {isEmail,isValidWebsite} from "./helpers/validation.js"
import { get } from 'svelte/store'
import { writable } from 'svelte-local-storage-store'
import { SvelteEasyToast, toast } from 'svelte-easy-toast';
export let name
export let totalSubmissions = 0;

let isOpenModal = false;

function openModal() {
 if ($tier ==0 && endpoints.length >0) {
errorMessage="You are limited to 1 form on the free tier. Please upgrade to enjoy premium features."
 }
 else { isOpenModal = true;}
}

function closeModal() {
  isOpenModal = false;
  newEndpointName = '';
}

let isOpenModal2 = false;

function openModal2() {
  isOpenModal2 = true;
}

function closeModal2() {
  isOpenModal2 = false;
}


function deleteSubmissions() { 
  let payload = {}
  let idsToDelete = selected.map(s => s[0])
  postJSON(`delete-submissions/${idsToDelete}`,payload,(data) =>{
    getJSON('submissions/'+ selectedEndpointId,(data) => {
	    submissions = data;
toast({
	                   type: 'success', // dark, danger, success, info, warning, default, error
	                   position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
	                   text: 'Forms Deleted',
	                   title: 'Success',
	               });


	})
selected =[];
  })
}

let selectedEndpointId 
let endpoints = []
let submissions = []
let newEndpointName
let headers = [] 
let rows = [] 
let errorMessage='';
let selected = [];

function toggleAll(e) {
    selected = e.target.checked ? [...rows] : [];
  }

let csvStream ='';

$: {
// Need this to reactivly clear headers and rows

headers=[];
rows=[];

for ( let i = 0; i < submissions.length;i++) {

let columns = []
headers[0]= 'id'
columns[0]= submissions[i].id

headers[1]= 'date created'
columns[1]= submissions[i].created_at

Object.entries(submissions[i].form_data).forEach(([key,value])=> {     

   // Add all unique keys to the headers
       if (headers.indexOf(key) === -1) {
          headers = [...headers,key]
         }

         let col = headers.indexOf(key) 
	 columns[col] = value

         rows[i]  = columns
	 
})

}
csvStream += headers.join(', ') + '\n';
csvStream += rows.join(', ') + '\n';

}


onMount(async ()=> {
getJSON(`endpoints/${$user_id}`, (data) => {
	//	if ($current_form) {
	//	selectedEndpointId = $current_form
	//	changeEndpoint(selectedEndpointId)
	//	}

	endpoints = data
	})
	getJSON(`submissions-count/${$user_id}`, (data) => {
	totalSubmissions = data.totalSubmissions;
	})
	})

function saveEndpoint() {
 let id = nanoid(7);
 let message = 'Thanks for submitting the form';
 let endpoint = {id:id, name:newEndpointName,message:message}
 endpoints = [...endpoints,endpoint ];
postJSON(`endpoints/${$user_id}`,endpoint,(data) =>{
})
}

const changeEndpoint = async(id) => {
selectedEndpointId = id
  getJSON('submissions/'+ selectedEndpointId,(data) => {
	  //current_form.set(id.toString())
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
		 <a href="https://buy.stripe.com/cN24hWaHzadp0jCbIS" target="_blank"><strong>Buy once and use forever</strong></a>
            </div>
        </div>
    </section>
{/if}
<div class="container">
{#if errorMessage}		
<div class="notification is-warning">{errorMessage}</div>
{/if}

<h1 class="title has-text-centered">Forms</h1>
{#if selectedEndpointId}
{/if}

<div class="columns">
  <div class="column is-one-fifth">
<aside class="menu">
  <p class="menu-label">
  Forms 
  </p>
  <ul class="menu-list">

<li><a on:click={openModal}>+ Create Form</a></li>
  {#each endpoints as {id,name}}
  <li> <a class:is-active="{id == selectedEndpointId}" on:click={()=> changeEndpoint(id)}>{ name }</a></li>
  {/each}
</ul>
<div class="mt-5">
{#if $tier == 0}
	<a target="_blank" href="https://buy.stripe.com/cN24hWaHzadp0jCbIS"><img src="/img/pricing.png"></a>
<div class="container">
    </div>
{/if}
</aside>

{#if $tier == 0}
<progress class="progress is-link" value="{totalSubmissions}" max="50">15%</progress>
<p>{totalSubmissions} of 50 form submission limit</p>
<p>{totalSubmissions / 50 * 100}% used</p>
{/if}

</div>
<div class="column">

{#if selectedEndpointId}
<MenuBar id={selectedEndpointId} hideHomeButton={true} />
<h1 class="m-3 has-text-centered has-text-weight-bold">Form ID: {selectedEndpointId}</h1>
{#if headers.length == 0}
<p class="subtitle has-text-centered my-5">Loading Form Submissions for Form ID: {selectedEndpointId}</p>
{:else}
<table class="table is-striped is-hoverable">
      <tr>
        <td colspan="3" class="has-text-right">
        <p><b>({rows.length})</b> form submissions
	<a class="button is-link is-small " download="fabform-submissions.csv" href="data:application/octet-stream,{encodeURI(csvStream)}">Download Submissions CSV</a></p>
        </td>
      </tr>
<div class="checkbox m-5">
	<label>
        {selected.length} 
	<input type="checkbox" on:change={toggleAll} checked={selected.length === rows.length} /> items selected 
</label>
<tbody>

<tr>

{#each headers as header }
<th>{header}</th>
{/each} 
</tr>
{#each rows as row,r}
<tr>
{#each headers as header,i}

{#if i == 0}
<div class="m-2 checkbox">
 <label>
            <input type="checkbox" bind:group={selected} name={row} value={row}  />
{row[i]}
        </label>
  </div>

{:else}
{#if isEmail(row[i])}
<td><a href="mailto:{row[i]}">{row[i]}</a></td>
{:else}
{#if isValidWebsite(row[i])}
<td><a target="blank" href="{row[i]}">{row[i]}</a></td>
{:else}
<td>{row[i] || ''}</td>
{/if}
{/if}

{/if}
{/each}

</tr>
{/each}
</tbody>
</table>

<Modal isOpenModal={isOpenModal2} on:closeModal={closeModal2} on:success={deleteSubmissions} title="Are you sure you want to delete the form submissions?" buttonText="Delete form submissions"/>

<button  disabled='{selected ==0}' class="button is-danger" on:click={openModal2}>Delete Form Submissions</button>

{/if}
{/if}

<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} on:success={saveEndpoint} title="Create Form" buttonText="Save Form">
 <div class="field">
   <label class="label">Name</label>
 <div class="control">
   <input class="input" type="text" bind:value="{newEndpointName}" placeholder="Give your form a name">
 </div>
 </div>
</Modal>

</main>

<style>
a {  
text-decoration: none
}
.alert {
            background-color: #ffdd57; /* Adjust the background color if needed */
            color: #363636; /* Text color */
            padding: 1.5rem;
            border-radius: 5px;
            border: 2px solid #ffcc00;
            display: flex;
            align-items: center;
            justify-content: center; /* Center all the text horizontally */
            text-align: center; /* Ensure text is centered */
            flex-wrap: wrap; /* Allow wrapping if the screen is too small */
    }

      .alert a {
            color: #3273dc; 
            text-decoration: underline;
            margin-left: 0.5rem; /* Add space before the link */
        }

        .alert strong {
            margin-right: 0.5rem;
        }
        .alert a {
            color: #3273dc; 
            text-decoration: underline;
        }

</style>
