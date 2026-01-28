<script>
  import { Route, router, active } from 'tinro'
  import { user_id, email, tier } from "./helpers/store.js"

  import Authguard from './Authguard.svelte'
  import Login from './Login.svelte'
  import Signup from './Signup.svelte'
  import ForgotPassword from './ForgotPassword.svelte'
  import LoginSuccess from './LoginSuccess.svelte'

  import Forms from './Forms.svelte'
  import Files from './Files.svelte'
  import Settings from './Settings.svelte'
  import Account from './Account.svelte'
  import SubmissionAPI from './SubmissionAPI.svelte'
  import Menu from './Menu.svelte'
  import Logout from './Logout.svelte'

  import { SvelteEasyToast } from 'svelte-easy-toast'
</script>

<svelte:head>
  <title>FabForm</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@creativebulma/bulma-tooltip@1.2.0/dist/bulma-tooltip.min.css" crossorigin="anonymous">
  <script defer data-domain="app.fabform.io" src="https://plausible.io/js/script.js"></script>
</svelte:head>

<div class="app-wrapper">

  <!-- NAVBAR -->
  <nav class="navbar has-shadow px-4 py-3 is-white">
    <div class="navbar-brand">
      <a href="/#/" class="navbar-item">
        <img src="/img/logo.png" alt="FabForm Logo" style="height: 32px;">
      </a>
    </div>

    <div class="navbar-end">
      <Menu />
    </div>
  </nav>

  <SvelteEasyToast />

  <!-- MAIN CONTENT -->
  <section class="section py-6">
    <div class="container">

      <!-- Public route outside Authguard -->
      <Route path="/login-success">
        <LoginSuccess />
      </Route>

      <Authguard>

        <!-- AUTHENTICATED ROUTES -->
        <div slot="authed">
          <Route path="/" redirect="/forms" />
          <Route path="/login/*" redirect="/forms" />

          <Route path="/forms"><Forms /></Route>
          <Route path="/files/:id"><Files /></Route>
          <Route path="/settings/:id"><Settings /></Route>
          <Route path="/submission-api/:id"><SubmissionAPI /></Route>
          <Route path="/account/"><Account /></Route>
          <Route path="/logout/"><Logout /></Route>
        </div>

        <!-- PUBLIC ROUTES -->
        <div slot="not_authed">

          <Route path="/">
            <div class="box has-text-centered py-6 px-5" style="max-width: 600px; margin: 0 auto;">
              <h1 class="title is-2 mb-4">The Smart Forms Backend</h1>
              <p class="subtitle is-5 mb-6">
                Collect form submissions instantly.<br>
                No backend required.
              </p>

              <div class="buttons is-centered mt-4">
                <a href="/#/signup" class="button is-primary is-medium">Sign Up</a>
                <a href="/#/login" class="button is-light is-medium">Login</a>
              </div>
            </div>
          </Route>

          <Route path="/forms/*" redirect="/login" />
          <Route path="/login"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/forgot-password"><ForgotPassword /></Route>

        </div>

      </Authguard>

    </div>
  </section>
</div>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    background: linear-gradient(135deg, #f8f9fb 0%, #eef1f6 100%);
    font-family: "Inter", sans-serif;
  }

  .app-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>

