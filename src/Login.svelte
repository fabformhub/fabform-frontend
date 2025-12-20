<script>
import {isEmail} from "./helpers/validation.js"
import {postJSON} from "./helpers/api.js"
import {router} from 'tinro';
import {user_id,email,tier} from "./helpers/store.js"
import { SvelteEasyToast, toast } from 'svelte-easy-toast';

let fields = {email:'', password:''}
let errors = {email:'', password:'',message:'',code:0}
let valid = false

function resendEmailConfirmation() { 
  let payload = {email:fields.email}
  postJSON(`resend-email-verification/`,payload,(data) =>{
	    toast({
	type: 'warning', // dark, danger, success, info, warning, default, error
	position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
	text: `Please confirm your email address with the link sent to ${fields.email} .`,
	title: 'Confirm Email Address',
	});
  })
}

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

if (fields.password.trim().length <1) {
 valid = false;
 errors.password = 'Password is required'
} else {
 errors.password = '';
}

if (valid) {
postJSON('login',{email: fields.email,password: fields.password},
(data) => {
    if (data.status == "loggedIn") {
      user_id.set(data.user_id.toString())
      email.set(data.email.toString())
      tier.set(data.tier.toString())
      router.goto("forms")
    }
    if (data.status == "notVerified") {
	    errors.message =`Please verify your email address with the link sent to ${fields.email}. 

		    If you dont see it check your spam folder. `
      errors.code = 1
}
    else { 
    errors.message ="Invalid username and or password"
    errors.code = 2
}
 } )  
}
}

</script>
<section class="hero">
  <div class="hero-body">
    <div class="container">
<p class="title has-text-centered">Login</p>
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
  <div class="field">
  <label for="password" class="label">Password</label>

  <div class="control has-icons-left has-icons-right">
  <input class="input" type="password" bind:value={fields.password} placeholder="password">
<span class="icon is-small is-left">
<i class="fa fa-lock"></i>
</span>
<span class="icon is-small is-right">
    {#if errors.password}  <i class="fas fa-exclamation-triangle"></i> {/if}
</span>
    </div>
<div>
<p class="help is-danger">{errors.password}</p>
 </div>
</div>

<p><a href="/#/forgot-password">Forgot Password?</a> </p>

<div class="field">

<button type="submit" class="button is-primary">
    <span class="icon">
      <i class="fas fa-sign-in-alt"></i>
    </span>
    <span>Login</span>
</button>
{#if errors.code ==1}
<button class="button is-info mt-2 mb-2" on:click={resendEmailConfirmation}>Resend Verification Email</button>
{/if}
{#if errors.message}
<div class="notification is-warning mt-2">{errors.message}</div>
{/if}

</form>

<p class="has-text-centered">Don't have an account? <a href="/#/signup">Sign Up</a> </p>
        </div>
      </div>
    </div>
  </section>
