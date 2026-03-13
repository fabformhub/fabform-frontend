<script>
import { onMount } from 'svelte'
import Modal from  './Modal.svelte'
import MenuBar from  './MenuBar.svelte'
import {user_id,email,tier} from "./helpers/store.js"
import {removeProtocol} from "./helpers/validation.js"
import {getJSON,postJSON} from "./helpers/api.js"
import {router,meta} from 'tinro';
import { SvelteEasyToast, toast } from 'svelte-easy-toast';
import UpgradeButton from "./UpgradeButton.svelte";
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
let telegramChatId = '';

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
telegramChatId = data.telegram_chat_id
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
  const payload = {
    id,
    name,
    respEmail,
    respEmailSubject,
    message,
    emailNotification,
    autoResp,
    autoRespEmail,
    autoRespEmailSubject,
    emailTemplate,
    autoRespTemplate,
    googleSheetId,
    webhookUrl,
    redirectUrl: removeProtocol(redirectUrl),
    replyTo,
    telegramChatId
  };

  postJSON(`endpoint/${id}`, payload, () => {
    toast({
      type: 'success',
      position: 'top-left',
      text: 'Changes Saved',
      title: 'Success'
    });
  });

  router.goto("/forms");
}


</script>
<div class="container">
  <h1 class="title has-text-centered">Settings Form ID: {id}</h1>

  <MenuBar id={id} />

<button class="button is-primary is-medium save-button m-5" on:click={saveEndpoint}>
  <span class="icon">
    <i class="fas fa-check-circle"></i>
  </span>
  <span>Save Changes</span>
</button>

  <div class="columns is-mobile is-multiline">
    <div class="column is-12-tablet is-10-desktop m-5">

      <!-- ========================= -->
      <!-- FORM BASICS -->
      <!-- ========================= -->
      <h2 class="title is-5 mt-6">Form Basics</h2>

      <div class="field mb-4">
        <label class="label" for="name">Form Name</label>
        <div class="control">
          <input
            id="name"
            class="input is-medium premium-input"
            name="name"
            bind:value="{name}"
            type="text"
            placeholder="Give your form a name"
          >
        </div>
      </div>

      <div class="field mb-4">
        <label class="label" for="message">Form Message</label>
        <div class="control">
          <textarea
            id="message"
            name="message"
            class="textarea is-medium premium-input"
            rows="10"
            cols="60"
            bind:value={message}
            placeholder="Enter message on form after form submitted"
          ></textarea>
        </div>
      </div>

      <div class="field mb-4">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" bind:checked={autoResp}>
            Send Auto-response Email
          </label>
        </div>
      </div>

      {#if $tier == 0}
        <UpgradeButton />
      {/if}

      <!-- ========================= -->
      <!-- TELEGRAM NOTIFICATIONS -->
      <!-- ========================= -->
      <h2 class="title is-5 mt-6">Telegram Notifications</h2>

      <div class="field mb-4">
        <label class="label" for="telegramChatId">Telegram Chat ID</label>
        <div class="control">
          <input
            id="telegramChatId"
            class="input is-medium premium-input"
            name="telegramChatId"
            bind:value="{telegramChatId}"
            type="text"
            placeholder="Enter your Telegram Chat ID to receive notifications"
          >
        </div>

        <div class="content mt-2">
          <p><strong>Enable Telegram notifications for new form submissions:</strong></p>
          <ol>
            <li>Open <a href="https://t.me/fabform_bot" target="_blank">@fabform_bot</a> in Telegram and press <code>/start</code> to activate the bot.</li>
            <li>Retrieve your Chat ID from <a href="https://t.me/userinfobot" target="_blank">@userinfobot</a>.</li>
            <li>Enter your Chat ID above to begin receiving notifications.</li>
          </ol>
        </div>
      </div>

      <!-- ========================= -->
      <!-- EMAIL NOTIFICATIONS -->
      <!-- ========================= -->
      <h2 class="title is-5 mt-6">Email Notifications</h2>

      <div class="box">

        <div class="field mb-4">
          <label class="label" for="respEmail">Notifications Email</label>
          <div class="control">
            <input
              id="respEmail"
              class="input is-medium premium-input"
              name="respEmail"
              bind:value="{respEmail}"
              type="email"
              placeholder="Enter email to send form submission notifications"
            >
          </div>
        </div>

        <div class="field mb-4">
          <label class="label" for="respEmailSubject">Email Subject</label>
          <div class="control">
            <input
              id="respEmailSubject"
              class="input is-medium premium-input"
              name="respEmailSubject"
              bind:value="{respEmailSubject}"
              type="text"
              placeholder="Enter email subject for form submission notifications"
            >
          </div>
        </div>

        <div class="field mb-4">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" bind:checked={emailNotification}>
              Send Email Notifications
            </label>
          </div>
        </div>

        <div class="notification is-info is-light mt-2">
          You can insert form field values into your email template using their <strong>name</strong> attribute.  
          Example: <code>&#123;firstName&#125;</code>
        </div>

        <div class="field mb-4">
          <label class="label" for="emailTemplate">Email Template</label>
          <div class="control">
            <textarea
              id="emailTemplate"
              name="emailTemplate"
              class="textarea is-medium premium-input"
              rows="10"
              cols="60"
              bind:value="{emailTemplate}"
              placeholder="The email template for form submission notifications."
            ></textarea>
          </div>
        </div>

      </div>

      <div class="notification is-info is-light mt-3">
        The <code>&lt;input type="email" name="email"&gt;</code> field in your HTML form determines where the autoresponse email is sent.
      </div>

      <!-- ========================= -->
      <!-- AUTORESPONSE EMAIL -->
      <!-- ========================= -->
      <h2 class="title is-5 mt-6">Autoresponse Email</h2>

      <div class="box">

        <div class="field mb-4">
          <label class="label" for="autoRespEmailSubject">Autoresponse Email Subject</label>
          <div class="control">
            <input
              id="autoRespEmailSubject"
              class="input is-medium premium-input"
              name="autoRespEmailSubject"
              bind:value="{autoRespEmailSubject}"
              type="text"
              placeholder="Enter email subject for autoresponse"
            >
          </div>
        </div>

        <div class="notification is-info is-light mt-2">
          Use the form field <strong>name</strong> attribute to include user‑submitted values in your autoresponse email.  
          Example: <code>&#123;firstName&#125;</code>
        </div>

        <div class="field mb-4">
          <label class="label" for="autoRespTemplate">Autoresponse Email Template</label>
          <div class="control">
            <textarea
              id="autoRespTemplate"
              name="autoRespTemplate"
              class="textarea is-medium premium-input"
              rows="10"
              cols="60"
              bind:value={autoRespTemplate}
              placeholder="The email template for autoresponse emails"
            ></textarea>
          </div>
        </div>

      </div>

      <!-- ========================= -->
      <!-- REDIRECTS & WEBHOOKS -->
      <!-- ========================= -->
      <h2 class="title is-5 mt-6">Redirects & Webhooks</h2>

      <div class="box">

        <div class="field mb-4">
          <label class="label" for="redirect_url">Redirect URL</label>
          <div class="control">
            <input
              id="redirect_url"
              class="input is-medium premium-input"
              name="redirectUrl"
              bind:value="{redirectUrl}"
              type="url"
              placeholder="The page to redirect to when the form has been submitted."
            >
          </div>
        </div>

        <div class="field mb-4">
          <label class="label" for="webhook_url">Webhook URL</label>
          <div class="control">
            <input
              id="webhook_url"
              class="input is-medium premium-input"
              name="webhookUrl"
              bind:value="{webhookUrl}"
              type="text"
              placeholder="The webhook URL to call when the form has been submitted."
            >
          </div>
        </div>

      </div>

      <!-- ========================= -->
      <!-- WARNING -->
      <!-- ========================= -->
      <div class="notification is-warning is-light mt-5">
        <strong>Warning:</strong> Deleting this form is permanent.  
        All submissions, uploaded files, and associated data will be permanently removed and cannot be recovered.
      </div>

      <!-- ========================= -->
      <!-- DANGER ZONE -->
      <!-- ========================= -->
      <h2 class="title is-5 has-text-danger mt-6">Danger Zone</h2>

      <div class="notification is-danger is-light">
        <strong>This action is irreversible.</strong><br>
        Deleting this form will permanently remove all submissions, uploaded files, and associated data.
      </div>

      <button class="button is-danger is-medium delete-button mt-3" on:click={openModal}>
  <span class="icon">
    <i class="fas fa-trash-alt"></i>
  </span>
  <span>Delete Form</span>
</button>


<Modal
  isOpenModal={isOpenModal}
  on:closeModal={closeModal}
  on:success={deleteEndpoint}
  title="Are you sure you want to delete this form?"
  buttonText="Delete"
  buttonClass="is-danger"
/>

    </div>
  </div>
</div>

