<script>
import {isEmail} from "./helpers/validation.js"
import {postJSON} from "./helpers/api.js"
import {router} from 'tinro';
import {user_id} from "./helpers/store.js"
	import { SvelteEasyToast, toast } from 'svelte-easy-toast';

let fields = {email:''}
let errors = {email:'',login:''}
let valid = false

function submitHandler() {
valid = true;
if (fields.email.trim().length <1) {
 valid = false;
 errors.email ='Email is required'
} else if (!isEmail(fields.email.trim())) {
  valid = false
  errors.email = 'Please enter a valid email'
} else {
  errors.email = '';
}
if (valid) {
postJSON('forgot-password',{email: fields.email},
(data) => {
	if (data.status == "sent") {
 toast({
	                 type: 'info', // dark, danger, success, info, warning, default, error
	                 position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
	                 text: `If an account for  ${fields.email} exists, we will send you the password.`,
	                 title: 'Forgot Password',
	             });
          router.goto('login')
    }
 })  
}
}

</script>
<section class="hero">
  <div class="hero-body">
    <div class="container">
<p class="title has-text-centered">Forgot Password</p>
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form on:submit|preventDefault={submitHandler} class="box" novalidate   >
<div class="field">
  <label for="email" class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input" bind:value={fields.email} type="email" placeholder="Email">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
    {#if errors.email }  <i class="fas fa-exclamation-triangle"></i> {/if}
    </span>
  </div>
<div>
<p class="help is-danger">{errors.email}</p>
</div>
</div>
<button type="submit" class="button is-primary">
    <span class="icon">
<i class="fa-solid fa-paper-plane"></i>
    </span>
    <span>Send</span>
</button>

{#if errors.login}
<div class="notification is-warning mt-3">{errors.login}</div>
{/if}
</form>
        </div>
      </div>
    </div>
  </section>
