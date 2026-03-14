<script>
  import Modal from './Modal.svelte'
  import { onMount } from 'svelte'
  import { user_id, email } from "./helpers/store.js"
  import { getJSON, postJSON } from "./helpers/api.js"
  import { router } from 'tinro'
  import { SvelteEasyToast, toast } from 'svelte-easy-toast'

  let isOpenModal = false
  let firstName = ""
  let lastName = ""
  let currentPassword = ""
  let newPassword = ""
  let confirmNewPassword = ""
  let errorMessage = ""

  onMount(async () => {
    getJSON(`get-user-info/${$email}`, (data) => {
      firstName = data.first_name
      lastName = data.last_name
    })
  })

  function openModal() {
    isOpenModal = true
  }

  function closeModal() {
    isOpenModal = false
  }

  function updatePassword() {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      errorMessage = 'All fields are required'
      return
    }

    if (newPassword !== confirmNewPassword) {
      errorMessage = 'New Password and Confirm New Password must match'
      return
    }

    postJSON('login', { email: $email, password: currentPassword }, (data) => {
      if (data.status === "loggedIn") {
        postJSON('change-password', { email: $email, newPassword }, (data) => {
          if (data.status === "success") {
            toast({
              type: 'success',
              position: 'top-center',
              text: 'Password has been changed',
              title: 'Success'
            })

            errorMessage = ""
            currentPassword = ""
            newPassword = ""
            confirmNewPassword = ""
          }
        })
      } else {
        errorMessage = "Your current password is not correct."
      }
    })
  }

  function updateUserInfo() {
    let payload = { firstName, lastName, email: $email }
    postJSON(`update-user-info`, payload, () => {
      toast({
        type: 'success',
        position: 'top-center',
        text: 'Changes Saved',
        title: 'Account'
      })
    })
  }

  function deleteAccount() {
    postJSON(`delete-account/${$user_id}`, {}, () => {
      toast({
        type: 'success',
        position: 'top-center',
        text: `Your account has successfully been deleted.`,
        title: 'Delete Account'
      })

      router.goto("logout")
    })
  }
</script>

<main>
  <div class="container account-container">

    <h1 class="title has-text-centered account-title">Account Settings</h1>
    <p class="subtitle has-text-centered account-subtitle">
      Manage your personal information, security, and account preferences.
    </p>

    <!-- PROFILE CARD -->
    <div class="card account-card">
      <header class="card-header">
        <p class="card-header-title section-title">Profile Information</p>
      </header>

      <div class="card-content">
        <div class="columns is-variable is-4">
          <div class="column">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" bind:value={firstName} type="text" placeholder="First Name">
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" bind:value={lastName} type="text" placeholder="Last Name">
              </div>
            </div>
          </div>
        </div>

        <button class="button is-primary is-rounded save-btn" on:click={updateUserInfo}>
          Save Changes
        </button>
      </div>
    </div>

    <!-- EMAIL CARD -->
    <div class="card account-card">
      <header class="card-header">
        <p class="card-header-title section-title">Email Address</p>
      </header>

      <div class="card-content">
        <p class="email-display">{$email}</p>
      </div>
    </div>

    <!-- PASSWORD CARD -->
    <div class="card account-card">
      <header class="card-header">
        <p class="card-header-title section-title">Change Password</p>
      </header>

      <div class="card-content">
        <div class="field">
          <input bind:value={currentPassword} class="input" type="password" placeholder="Current Password">
        </div>

        <div class="field">
          <input bind:value={newPassword} class="input" type="password" placeholder="New Password">
        </div>

        <div class="field">
          <input bind:value={confirmNewPassword} class="input" type="password" placeholder="Confirm New Password">
        </div>

        {#if errorMessage}
          <p class="help is-danger my-3">{errorMessage}</p>
        {/if}

        <button class="button is-primary is-rounded save-btn" on:click={updatePassword}>
          Update Password
        </button>
      </div>
    </div>

    <!-- DANGER ZONE -->
    <div class="card account-card danger-card">
      <header class="card-header">
        <p class="card-header-title danger-title">Danger Zone</p>
      </header>

      <div class="card-content">
        <p class="danger-description">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>

        <Modal
          isOpenModal={isOpenModal}
          on:closeModal={closeModal}
          on:success={deleteAccount}
          title="Are you sure you want to delete this Account?"
          buttonText="Delete"
        />

        <button class="button is-danger is-rounded delete-btn" on:click={openModal}>
          Delete Account
        </button>
      </div>
    </div>

  </div>
</main>

<style>
  .account-container {
    max-width: 820px;
    margin-top: 2.5rem;
    margin-bottom: 4rem;
  }

  .account-title {
    font-weight: 800;
    font-size: 2.3rem;
    color: #0f172a;
  }

  .account-subtitle {
    color: #475569;
    margin-bottom: 2.5rem;
  }

  .account-card {
    border-radius: 14px;
    margin-bottom: 2rem;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  }

  .card-header {
    background: #f8fafc;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }

  .card-content {
    padding: 2rem;
  }

  .email-display {
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    background: #f1f5f9;
    padding: 0.9rem 1.1rem;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .save-btn,
  .delete-btn {
    margin-top: 1rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    font-weight: 600;
  }

  .danger-card {
    border: 1px solid rgba(220,38,38,0.25);
    background: #fff5f5;
  }

  .danger-title {
    color: #b91c1c !important;
  }

  .danger-description {
    color: #7f1d1d;
    margin-bottom: 1rem;
  }
</style>

