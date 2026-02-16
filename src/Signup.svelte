<script>
  import { SvelteEasyToast, toast } from 'svelte-easy-toast'

  let email = "";
  let password = "";
  let confirmPassword = "";

  let errors = {
    email: "",
    password: "",
    confirmPassword: "",
    login: ""
  };

  function loginWithGoogle() {
    window.location.href = "https://fabform.io/f/auth/google";
  }

  function loginWithGithub() {
    window.location.href = "https://fabform.io/f/auth/github";
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  async function signupWithEmail() {
    errors = { email: "", password: "", confirmPassword: "", login: "" };
    let valid = true;

    const e = email.trim();
    const p = password.trim();
    const cp = confirmPassword.trim();

    // email validation
    if (!e) {
      errors.email = "Email is required";
      valid = false;
    } else if (!isEmail(e)) {
      errors.email = "Please enter a valid email";
      valid = false;
    }

    // password validation
    if (!p) {
      errors.password = "Password is required";
      valid = false;
    }

    // confirm password validation
    if (!cp) {
      errors.confirmPassword = "Confirmation password is required";
      valid = false;
    } else if (p !== cp) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!valid) return;

    // check email
    const checkRes = await fetch("/f/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e })
    });

    const checkData = await checkRes.json();

    if (checkData.success === true) {
      errors.login = "Email already exists in our database.";
      return;
    }

    // signup
    const signupRes = await fetch("/f/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e, password: p })
    });

    const signupData = await signupRes.json();

    if (signupData.success === true) {
      toast({
        type: 'warning',
        position: 'top-center',
        title: 'Confirm Email Address',
        text: `Please confirm your email address with the link sent to ${e}. If you can't find it, check your spam folder.`
      });

      window.location.href = "/login";
    } else {
      errors.login = signupData.message || "Signup failed. Please try again.";
    }
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
        {#if errors.email}
          <p class="help is-danger">{errors.email}</p>
        {/if}
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
        {#if errors.password}
          <p class="help is-danger">{errors.password}</p>
        {/if}
      </div>

      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="••••••••"
            bind:value={confirmPassword}
          />
        </div>
        {#if errors.confirmPassword}
          <p class="help is-danger">{errors.confirmPassword}</p>
        {/if}
      </div>

      {#if errors.login}
        <p class="help is-danger">{errors.login}</p>
      {/if}

      <button
        class="button is-primary is-fullwidth mt-3"
        on:click|preventDefault={signupWithEmail}
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

