<script>
  import { user_id, email, tier } from "./helpers/store.js";
  import UpgradeButton from "./UpgradeButton.svelte";

  export let id;
  export let hideHomeButton = false;
</script>

<div class="ml-6">
  <a class="button" href={`/#/settings/${id}`}>
    <i class="m-1 fa-solid fa-gear" aria-hidden="true"></i>Settings
  </a>

  <a class="button" href={`/#/files/${id}`}>
    <i class="m-1 fa-solid fa-file" aria-hidden="true"></i>File Uploads
  </a>

  <a class="button" href="https://docs.fabform.io" target="_blank">
    <i class="m-1 fas fa-book" aria-hidden="true"></i>Help Docs
  </a>

  {#if !hideHomeButton}
    <a class="button" href="/#/">
      <i class="m-1 fa-solid fa-backward" aria-hidden="true"></i>Go Back
    </a>
  {/if}

  {#if $user_id}
    {#if $tier == 0}
      <UpgradeButton />
    {/if}
  {/if}
</div>

<style>
  a {
    text-decoration: none;
  }
</style>

