<script>
  function loginWithGoogle() {
    window.location.href = "https://fabform.io/f/auth/google";
  }

  function loginWithGithub() {
    window.location.href = "https://fabform.io/f/auth/github";
  }

  let email = "";
  let password = "";

  function signupWithEmail() {
    // Your existing email signup logic goes here
    console.log("Signup with:", email, password);
  }
</script>

<section class="section">
  <div class="container" style="max-width: 420px;">
    <h1 class="title has-text-centered">Create your account</h1>
    <p class="subtitle has-text-centered has-text-grey">
      Start building forms in seconds
    </p>

    <!-- Social Login Buttons -->
    <div class="box" style="padding: 1.75rem;">
      <button
        class="button is-fullwidth is-light mb-3"
        on:click={loginWithGoogle}
        style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="18"
          height="18"
        />
        Continue with Google
      </button>

      <button
        class="button is-fullwidth is-dark"
        on:click={loginWithGithub}
        style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          width="20"
          height="20"
        />
        Continue with GitHub
      </button>
    </div>

    <!-- Divider -->
    <div class="has-text-centered my-4">
      <span class="has-text-grey">or</span>
    </div>

    <!-- Email Signup Form -->
    <div class="box" style="padding: 1.75rem;">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="you@example.com"
            bind:value={email}
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="••••••••"
            bind:value={password}
          />
        </div>
      </div>

      <button
        class="button is-primary is-fullwidth mt-3"
        on:click={signupWithEmail}
      >
        Create account
      </button>
    </div>

    <p class="has-text-centered mt-4">
      Already have an account?
      <a href="/login">Log in</a>
    </p>
  </div>
</section>

