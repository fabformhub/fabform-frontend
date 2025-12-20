<script>
import Modal from  './Modal.svelte'
import { onMount } from 'svelte'
import {user_id,email} from "./helpers/store.js"
import {getJSON,postJSON} from "./helpers/api.js"
import {router} from 'tinro';
import { SvelteEasyToast, toast } from 'svelte-easy-toast';

let  isOpenModal = false;
let  firstName = "";
let  lastName ="";
let  currentPassword = "";
let  newPassword = "";
let  confirmNewPassword = "";
let errorMessage = '';

onMount(async ()=> {
getJSON(`get-user-info/${$email}`, (data) => {
firstName = data.first_name
lastName  = data.last_name
})

})

function openModal() {
  isOpenModal = true;
}

function closeModal() {
  isOpenModal = false;
}

function saveChanges() {

}

function updatePassword() {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      errorMessage = 'All fields are required';
      return false;
    } else if (newPassword !== confirmNewPassword) {
      errorMessage = 'New Password and Confirm New Password must match';
      return false;
    } else {


postJSON('login',{email: $email, password: currentPassword},
(data) => {
    if (data.status == "loggedIn") {
       postJSON('change-password',{email: $email, newPassword: newPassword},
       (data) => {

	       if (data.status == "success") {
   toast({
	                   type: 'success', // dark, danger, success, info, warning, default, error
	                   position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
	                   text: 'Password has been changed',
	                   title: 'Success',
	               });

       errorMessage = "";
       currentPassword = "";
       newPassword = "";
       confirmNewPassword = "";
      return true;
      }
     })
    }
    else { 
      errorMessage ="Your currrent password is not correct."
      }
    })  

 }
      
}

function resendEmailConfirmation() { 
 let payload = {email:$email}
 postJSON(`resend-email-verification/`,payload,(data) =>{
	 //     addToast(`Please confirm your email address with the link sent to ${$email}`,'info',15000)
   })
}

function updateUserInfo() { 
 let payload = {firstName:firstName,lastName:lastName,email:$email}
 postJSON(`update-user-info`,payload,(data) =>{
 toast({
   type: 'success', // dark, danger, success, info, warning, default, error
   position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
   text: 'Changes Saved',
   title: 'Account',
  });
   })
}

function deleteAccount() { 
 let payload = {}
 postJSON(`delete-account/${$user_id}`,payload,(data) =>{
toast({
   type: 'success', // dark, danger, success, info, warning, default, error
   position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
   text: `Your account has successfully been deleted.`,
  title: 'Delete Account',
  });
  
  router.goto("logout")
  })
}

</script>

<main>
<div class="container">
<h1 class="title has-text-centered">Account</h1>

<div class="columns">
  <div class="column">
    <div class="field">
      <label for="firstName" class="label">First Name</label>
      <div class="control">
        <input class="input" name="firstName" bind:value="{firstName}" type="text" placeholder="What's your first name">
      </div>
    </div>
  </div>
  <div class="column">
    <div class="field">
      <label for="lastName" class="label">Last Name</label>
      <div class="control">
        <input class="input" name="lastName" bind:value="{lastName}" type="text" placeholder="What's your last name">
      </div>
    </div>
  </div>
</div>

<button class="my-3 button is-link" on:click={updateUserInfo}>Save Changes</button>



<div class="field">
  <label for="email" class="label">Email</label>
  <div class="control">
    <span class="is-flex is-align-items-center">
      {$email} 
      <!--      <button class="button is-ghost ml-2" on:click={resendEmailConfirmation}>Change Email</button>-->
    </span>
  </div>
</div>
<div class="field">
  <label class="label">Change Password</label>
  <div class="control">
    <div class="field">
      <div class="control">
        <input bind:value={currentPassword} class="input" name="currentPassword" type="password" placeholder="Current Password">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input bind:value={newPassword} class="input" name="newPassword" type="password" placeholder="New Password">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input bind:value={confirmNewPassword} class="input" name="confirmNewPassword" type="password" placeholder="Confirm New Password">
      </div>
    </div>
    {#if errorMessage}
      <p class="help is-danger my-3">{errorMessage}</p>
    {/if}
    <button on:click={updatePassword} class="button is-link">Change Password</button>
  </div>

<div class="field">
  <label class="label">Danger Zone </label>
  <div class="control">
    <div class="field">
<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} on:success={deleteAccount} title="Are you sure you want to delete this Account?" buttonText="Delete"/>

<button class="button is-danger" on:click={openModal}>Delete Account</button>
</div>
</div>
</main>
