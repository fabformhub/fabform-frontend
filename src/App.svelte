<script>
 import {Route,router,active} from 'tinro';
 import { get } from 'svelte/store'
 import { writable } from 'svelte-local-storage-store'
 import {user_id,email,tier} from "./helpers/store.js"
 import Authguard from './Authguard.svelte';
 import Login from './Login.svelte';
 import Signup from './Signup.svelte';
 import ForgotPassword from './ForgotPassword.svelte';
 import Forms from './Forms.svelte'
 import Files from './Files.svelte'
 import Settings from './Settings.svelte'
 import Account from './Account.svelte'
 import SubmissionAPI from './SubmissionAPI.svelte'
 import Menu from './Menu.svelte';
 import Logout from './Logout.svelte';
 import { SvelteEasyToast, toast } from 'svelte-easy-toast';
</script>
<svelte:head>
<title>FabForm</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@creativebulma/bulma-tooltip@1.2.0/dist/bulma-tooltip.min.css" integrity="sha256-OdzWB7wl1AMkFaqhYBnoQJGUJMDAexXa44rXs/d2n4A=" crossorigin="anonymous">
<script defer data-domain="app.fabform.io" src="https://plausible.io/js/script.js"></script>

</svelte:head>
<div class="container">
<img src="/img/logo.png" alt="Logo">
<SvelteEasyToast />
<div class="bg"> </div>
<div class="columns">
<div class="column is-four-fifths">
  </div>
  <div class="column">
<Menu/> 
  </div>
</div> 
<Authguard>
	<div slot="authed">
   		<Route path="/" redirect="/forms"/>
   		<Route path="/login/*" redirect="/forms"/>
		<Route path="/forms"><Forms/></Route>
		<Route path="/files/:id"><Files/></Route>
		<Route path="/settings/:id"><Settings/></Route>
		<Route path="/submission-api/:id"><SubmissionAPI/></Route>
		<Route path="/account/"><Account/></Route>
		<Route path="/logout/"><Logout/></Route>
	</div>

	<div slot="not_authed">

                <Route path="/">
<p class="is-pulled-right">
	  <a href="/#/signup" class="button is-primary m-2" use:active>Sign Up</a>
  </p>
  <p class="is-pulled-right">
	    <a href="/#/login" class="button is-light m-2" use:active>Login</a>
    </p>
		<div class="has-text-centered mt-5">
        	   <figure class="image is-256x256 is-inline-block">
		    <h3 class="title is-3">The smart forms backend</h3>
        	   </figure>
		</div>
		</Route>
		<Route path="/forms/*" redirect="/login"/>
		<Route path="/login"><Login/></Route>
		<Route path="/signup"><Signup/></Route>
		<Route path="/forgot-password"><ForgotPassword/></Route>
	</div>
</Authguard>
</div>

<style>

:global(html,body){
  height: 100%;
  margin: 0;
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

</style>
