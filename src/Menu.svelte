<script>
import {active} from 'tinro';
import {user_id} from "./helpers/store.js"
import {clickOutside} from './clickOutside.js';

let show = false;

const toggleDropdown = () =>{
    show = !show
  }

let keyCode;

const onKeydown = (event) => {
  keyCode = event.keyCode;
  if (keyCode ==27) { show =false}
}

function closeMenu(event) {
  show = false;
}

</script>
{#if $user_id}
<div class="mt-1 dropdown" class:is-active={show} on:click={toggleDropdown} on:keydown={onKeydown} use:clickOutside on:click_outside={closeMenu}>
  <div class="dropdown-trigger ">
    <button class="button " aria-haspopup="true" aria-controls="dropdown-menu" >
      <span>Menu</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
<a class="dropdown-item" href="/#/account"><span><i class="fa-solid fa-user"></i></span>
Account
</a>
<a class="dropdown-item" href="/#/forms"><span>
<i class="fa-brands fa-wpforms"></i></span>
Forms
</a>
<a class="dropdown-item" target="_blank" href="https://docs.fabform.io"><span>
<i class="fa-solid fa-book"></i></span>
Documentation
</a>
<a class="dropdown-item" target="_blank" href="https://fabform.io/contact-us/"><span>
<i class="fa-regular fa-message"></i></span>
Contact Us
</a>

<hr class="dropdown-divider">
<a class="dropdown-item" href="/#/logout">
<span><i class="fas fa-sign-out"></i></span>
Logout
</a>
    </div>
  </div>
</div>
{:else}

{/if}

<style>

.dropdown-item {
text-decoration: none !important;
     margin: 1;
     padding-top: 1;    /* Adjust the top padding as needed */
     padding-bottom: 1;
}
</style>

