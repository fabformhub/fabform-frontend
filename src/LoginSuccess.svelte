<script>
  import { onMount } from "svelte";
  import { email, user_id, tier } from "./helpers/store.js";
  import { router } from "tinro";

  let user = null;
  let loading = true;
  let data = null;

  console.log("login-success component loaded");

  onMount(async () => {
    console.log("onMount fired");

    try {
      const res = await fetch("https://fabform.io/f/me", {
        credentials: "include"
      });

      console.log("Fetch started:", res.status);

      data = await res.json();
      console.log("ME RESPONSE:", data);

      // Validate user object
      if (data && data.email) {
        user = data;

        email.set(data.email);
        user_id.set(data.id);
        tier.set(data.tier);

        console.log("User loaded:", user);
      } else {
        console.warn("No valid user, redirecting to login");
        router.goto("/login");
        return;
      }

    } catch (err) {
      console.error("Failed to load user", err);
      router.goto("/login");
      return;
    }

    loading = false;
    console.log("Loading set to false");
  });
</script>
<h1 style="background:red;color:white;">I AM VISIBLE</h1>

<section class="section">
  <div class="container has-text-centered">
    <p class="title is-4">Just Loaded Success Page</p>
    <p>User email is:</p>
    {#if data}
      {data.email}
    {/if}
  </div>
</section>

{#if loading}
  <section class="section">
    <div class="container has-text-centered">
      <p class="title is-4">Signing you in…</p>
      <progress class="progress is-small is-primary" max="100">Loading</progress>
    </div>
  </section>
{:else}
  <section class="section">
    <div class="container" style="max-width: 480px;">
      <div class="box has-text-centered">

        <span class="icon is-large has-text-success">
          <i class="fas fa-check-circle fa-3x"></i>
        </span>

        <h1 class="title is-4 mt-3">Login Successful</h1>
        <p class="subtitle is-6">Welcome back!</p>

        {#if user}
          <div class="content has-text-left mt-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Tier:</strong> {user.tier}</p>
          </div>
        {:else}
          <p>No user loaded</p>
        {/if}

        <p class="has-text-grey mt-4">
          Redirecting to your dashboard…
        </p>
      </div>
    </div>
  </section>
{/if}

