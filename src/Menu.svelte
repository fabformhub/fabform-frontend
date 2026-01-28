<script>
  import { active } from 'tinro'
  import { user_id } from "./helpers/store.js"
  import { clickOutside } from './clickOutside.js'

  let show = false

  const toggleDropdown = () => {
    show = !show
  }

  const onKeydown = (event) => {
    if (event.keyCode === 27) show = false
  }

  function closeMenu() {
    show = false
  }
</script>

{#if $user_id}
<div 
  class="dropdown is-right" 
  class:is-active={show}
  on:click={toggleDropdown}
  on:keydown={onKeydown}
  use:clickOutside
  on:click_outside={closeMenu}
>

  <!-- Trigger -->
  <div class="dropdown-trigger">
    <button class="button is-white has-text-weight-semibold px-4 py-2" aria-haspopup="true">
      <span>Menu</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down"></i>
      </span>
    </button>
  </div>

  <!-- Menu -->
  <div class="dropdown-menu" role="menu">
    <div class="dropdown-content box p-0">

      <a class="dropdown-item py-3 px-4" href="/#/account">
        <span class="mr-2"><i class="fa-solid fa-user"></i></span>
        Account
      </a>

      <a class="dropdown-item py-3 px-4" href="/#/forms">
        <span class="mr-2"><i class="fa-brands fa-wpforms"></i></span>
        Forms
      </a>

      <a class="dropdown-item py-3 px-4" target="_blank" href="https://docs.fabform.io">
        <span class="mr-2"><i class="fa-solid fa-book"></i></span>
        Documentation
      </a>

      <a class="dropdown-item py-3 px-4" target="_blank" href="https://fabform.io/contact-us/">
        <span class="mr-2"><i class="fa-regular fa-message"></i></span>
        Contact Us
      </a>

      <hr class="dropdown-divider">

      <a class="dropdown-item py-3 px-4" href="/#/logout">
        <span class="mr-2"><i class="fas fa-sign-out"></i></span>
        Logout
      </a>

    </div>
  </div>
</div>
{/if}

<style>
  /* Fix text cut-off by letting Bulma handle width naturally */
  .dropdown-menu {
    min-width: 220px; /* clean, Bulma-friendly width */
  }

  /* Improve dropdown item readability */
  .dropdown-item {
    font-size: 0.95rem;
    display: flex;
    align-items: center;
  }

  .dropdown-item:hover {
    background: #f5f5f5;
  }

  /* Icon alignment */
  .dropdown-item i {
    width: 18px;
    text-align: center;
  }

  /* Button styling consistent with Bulma */
  .dropdown-trigger .button {
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    transition: background 0.15s ease;
  }

  .dropdown-trigger .button:hover {
    background: #fafafa;
  }
</style>

