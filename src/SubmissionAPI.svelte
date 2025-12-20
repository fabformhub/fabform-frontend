<script>
import Modal from  './Modal.svelte'
import { onMount } from 'svelte'
import {user_id,email} from "./helpers/store.js"
import MenuBar from  './MenuBar.svelte'
import {getJSON,postJSON} from "./helpers/api.js"
import {router,meta} from 'tinro';

const route = meta();  
let id = route.params.id


let isOpenModal = false;
let uid = '';
let token = '';
let APIURL = `/v1/forms/${uid}?token=${token}`;

onMount(async ()=> {
getJSON(`get-submission-api/${id}`, (data) => {
console.log(data)
uid    = data.uid;
token  = data.jwt;
APIURL = `https:fabform.io/v1/forms/${uid}?token=${token}`;
})

})

function openModal() {
  isOpenModal = true;
}

function closeModal() {
  isOpenModal = false;
}

function refreshToken() {
  alert("here")
 }
      
</script>

<main>
<div class="container m-5">
<MenuBar id={id} />
<div>
<h1 class="title has-text-centered">Submission API</h1>
      <label for="APIURL" class="label">You can make a request to gather your submission info of your form</label>
      <div class="control">
        <input class="input" name="APIURL" bind:value="{APIURL}" type="text" placeholder="">
      </div>
    </div>
  </div>
<button class="my-3 button is-link" on:click={refreshToken}>Refresh Token</button>
</main>
