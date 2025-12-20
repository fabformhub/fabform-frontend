<script>
import {isEmail} from "./helpers/validation.js"
import {postJSON} from "./helpers/api.js"
import {router} from 'tinro';
import {user_id} from "./helpers/store.js"
import { SvelteEasyToast, toast } from 'svelte-easy-toast';

let fields = {email:'', password:'',confirmpassword:''}
let errors = {email:'', password:'',confirmpassword:'', login:''}
let valid = false

function submithandler() {

valid = true;
  errors.email = '';
  errors.password = '';
  errors.confirmpassword = ''

if (fields.email.trim().length <1) {
 valid = false;
 errors.email ='email is required'
} else if (!isEmail(fields.email.trim())) {
  valid = false
  errors.email = 'please enter a valid email'
} 
if (fields.password.trim().length <1) {
 valid = false;
 errors.password = 'password is required'
} 
if (fields.confirmpassword.trim().length <1) {
 valid = false;
 errors.confirmpassword = 'confimation password is required'
}  if ( fields.password && fields.confirmpassword) { 
 if (fields.password !== fields.confirmpassword ) {
 valid = false;
 errors.password = 'password and confirmation password do not match.'
} 
}

if (valid) {
postJSON('check-email',{email: fields.email},
(data) => {
    if (data.success == "true") {
      errors.login ="email already exists in our database." 
     } else {
         postJSON('signup',{email: fields.email,password: fields.password},
           (data) => {
		   if (data.success == "true") {

 toast({
	                 type: 'warning', // dark, danger, success, info, warning, default, error
	                 position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
			 text: `Please confirm your email address with the link sent to ${fields.email} 
     If you can't find it, check your spam folder.`,
			title: 'Confirm Email Address',
	             });
     router.goto('login')}
           })
        }
   })  
 }
}

</script>
<section class="hero">
  <div class="hero-body">
    <div class="container">
<p class="title has-text-centered">Sign Up</p>
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form on:submit|preventDefault={submithandler} class="box" novalidate   >
<div class="field">
  <label for="email" class="label">email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input" bind:value={fields.email} type="email" placeholder="email">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">

     {#if errors.email} <i class="fas fa-exclamation-triangle"></i>{/if}
    </span>
  </div>
<div>
<p class="help is-danger">{errors.email}</p>
</div>
</div>
  <div class="field">
  <label for="password" class="label">password</label>

  <div class="control has-icons-left has-icons-right">
  <input class="input" type="password" bind:value={fields.password} placeholder="password">
<span class="icon is-small is-left">
<i class="fa fa-lock"></i>
</span>
<span class="icon is-small is-right">
     {#if errors.password} <i class="fas fa-exclamation-triangle"></i>{/if}
</span>
    </div>
<div>
<p class="help is-danger">{errors.password}</p>
 </div>
</div>
<div class="field">
  <label for="confrimpassword" class="label">confirm password</label>

  <div class="control has-icons-left has-icons-right">
  <input class="input" type="password" bind:value={fields.confirmpassword} placeholder="confirm password">
<span class="icon is-small is-left">
<i class="fa fa-lock"></i>
</span>
<span class="icon is-small is-right">
     {#if errors.confirmpassword} <i class="fas fa-exclamation-triangle"></i>{/if}
</span>
    </div>
<div>
<p class="help is-danger">{errors.confirmpassword}</p>
 </div>
</div>
<div class="field">

<button type="submit" class="button is-primary">
    <span class="icon">
      <i class="fas fa-user-plus"></i>
    </span>
    <span>create account</span>
  </button>

{#if errors.login}
<div class="notification is-warning">{errors.login}</div>
{/if}
</form>
<p class="has-text-centered">Already have an account? <a href= "/#/login">Log in</a></p>
        </div>
      </div>
    </div>
  </section>
