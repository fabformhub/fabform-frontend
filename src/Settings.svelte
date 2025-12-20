<script>
import { onMount } from 'svelte'
import Modal from  './Modal.svelte'
import MenuBar from  './MenuBar.svelte'
import {user_id,email,tier} from "./helpers/store.js"
import {removeProtocol} from "./helpers/validation.js"
import {getJSON,postJSON} from "./helpers/api.js"
import {router,meta} from 'tinro';
import { SvelteEasyToast, toast } from 'svelte-easy-toast';
const route = meta();  
let id = route.params.id


let name =''
let respEmail =''
let respEmailSubject ='';
let message ='Thanks for submitting the form'
let emailNotification = false;
let emailTemplate =''
let googleSheetId =''
let replyTo ='';
let redirectUrl = ''
let isOpenModal = false;
let autoRespEmail ='';
let autoRespEmailSubject ='';
let autoResp = false;
let autoRespTemplate ='';
let webhookUrl = '';

function openModal() {
  isOpenModal = true;
}

function closeModal() {
  isOpenModal = false;
}

onMount(async ()=> {
getJSON(`endpoint/${id}`, (data) => {
name = data.name
respEmail = data.resp_email
respEmailSubject = data.resp_email_subject
autoRespEmail = data.auto_resp_email
autoRespEmailSubject = data.auto_resp_email_subject
message = data.message
replyTo = data.reply_to
emailNotification = data.email_notification
autoResp= data.auto_resp
emailTemplate = data.email_template
autoRespTemplate = data.auto_resp_template
googleSheetId = data.google_sheet_id
webhookUrl    = data.webhook_url
redirectUrl   = data.redirect_url
})
 })

function goBack() {
router.goto("/forms")
}

function deleteEndpoint() { 
  let payload = {}
	postJSON(`delete-endpoint/${id}`,payload,(data) =>{
       // fix this later not clean code
		//	current_form.set(null)
toast({
		type: 'success', // dark, danger, success, info, warning, default, error
		position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
		text: 'Form Deleted',
		title: 'Success',
	    });

        router.goto("/forms")
  })
}

function saveEndpoint() { 
  let payload = {id:id, name:name, respEmail :respEmail, respEmailSubject :respEmailSubject, message:message, emailNotification:emailNotification,autoResp:autoResp, autoRespEmail:autoRespEmail, autoRespEmailSubject:autoRespEmailSubject,emailTemplate:emailTemplate,autoRespTemplate:autoRespTemplate,googleSheetId:googleSheetId,webhookUrl:webhookUrl,redirectUrl:removeProtocol(redirectUrl),replyTo:replyTo}
 postJSON(`endpoint/${id}`,payload,(data) =>{
	   toast({
		type: 'success', // dark, danger, success, info, warning, default, error
		position: 'top-left', // top-left, top-center, bottom-left, bottom-right, bottom-center
		text: 'Changes Saved',
		title: 'Success',
	    });
 })
router.goto("/forms")
}
</script>

<main>

<div class="container">
<h1 class="title has-text-centered">Settings Form ID: {id}</h1>
<MenuBar id={id} />
<div>
<button class="button is-link m-5" on:click={saveEndpoint}>Save Changes</button>
<div class="columns">
<div class="column is-10 m-5">
<div class="field">
  <label for="name">Form Name</label>
 <div class="control">
  <input class="input" name="name" bind:value="{name}" type="text" placeHolder="Give your form a name">
 </div>
</div>


<div class="field">
  <label for="message">Form Message</label>
 <div class="control">
	 <textarea name="message" class="textarea mt-5" rows="10" cols="60" bind:value={message} placeHolder= "Enter message on form after form submitted"/> 
</div>
</div>


<div class="field">
<label class="checkbox">
  <input type="checkbox" bind:checked={autoResp} >
   Send Auto-response Email</label>
</div>


{#if $tier == 0}
<a class="m-1 button is-info is-rounded" target="_blank" href="https://buy.stripe.com/cN24hWaHzadp0jCbIS">Upgrade to <span class="tag is-white is-rounded ml-1 mr-1 pl-1 pr-1 has-text-black">PRO</span> to unlock all these great features below</a>
{/if}


<div class="field">
  <label for="respEmail">Notifications Email</label>
 <div class="control">
<input class="input mt-5" name="respEmail" bind:value="{respEmail}" type="email" placeHolder="Enter email to send form submission notifications" disabled={$tier ==0}/>
 </div>
</div>


<div class="field">
  <label for="respEmailSubject">Notifications Email Subject</label>
 <div class="control">
  <input class="input mt-5" name="respEmailSubject" bind:value="{respEmailSubject}" type="text" placeHolder="Enter email subject for form submission notifications" disabled={$tier ==0}/>
 </div>
</div>

<div class="field">
<label class="checkbox">
  <input type="checkbox" bind:checked={emailNotification} disabled={$tier ==0}/>
   Send Email Notifications
    </label>
</div>

<div class="field">
  <label for="emailTemplate">Notifications Email Template</label>
  <div class="notification mt-3" disabled={$tier ==0}/ >
  Use the form elements <strong>name</strong> attribute to insert it's value, ex. Hello <strong> {'{'}firstName{'}'}</strong>
</div>

 <div class="control">
	 <textarea name="emailTemplate" class="textarea mt-5" rows="10" cols="60" bind:value="{emailTemplate}" disabled={$tier ==0} placeHolder= "The email template for form submission notifications."></textarea>
</div>
</div>

<div class="notification mt-1">
The &lt;input type="email" name="email"&gt; field in your HTML form defines where to send the autoresponse e-mail
</div>

<div class="field">
  <label for="autoRespEmailSubject">Auto-response Email Subject</label>
 <div class="control">
  <input class="input mt-5" name="autoRespEmailSubject" bind:value="{autoRespEmailSubject}" type="text" placeHolder="Enter email subject for autoresponse" disabled={$tier ==0}/>
 </div>
</div>

<div class="field">
	<label for="autoRespTemplate">Auto-response Email Template</label>
	<div class="notification mt-2">
		Use the form elements <strong>name</strong> attribute to insert it's value, ex. Hello <strong> {'{'}firstName{'}'}
</div>

 <div class="control">
<textarea name="autoRespTemplate" class="textarea mt-5" rows="10" cols="60" bind:value={autoRespTemplate} placeHolder= "The email template for autoresponse emails" disabled={$tier ==0}/>
</div>
</div>

<div class="field">
  <label for="redirect_url">Redirect URL</label>
 <div class="control">
  <input class="input mt-5" name="redirectUrl" bind:value="{redirectUrl}" type="url" placeHolder="The page to redirect to when the form has been submitted." disabled={$tier ==0}>
 </div>
</div>

<div class="field">
  <label for="webhook_url">Webhook URL</label>
 <div class="control">
  <input class="input mt-5" name="webhookUrl" bind:value="{webhookUrl}" type="text" placeHolder="The webhook URL to call when the form has been submitted." disabled={$tier==0}>
 </div>
</div>

<div class="notification">
Deleting the form will erase all traces of this form, including all submissions and file uploads
</div>

<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} on:success={deleteEndpoint} title="Are you sure you want to delete this form?" buttonText="Delete"/>
<div class="field">
  <label for="danger_zone">DANGER ZONE</label>
  <button class="button is-danger" on:click={openModal}>Delete Form</button>
  </div>
</div>
</main>
