<script>
  import { isEmail } from "./helpers/validation.js"
  import { postJSON } from "./helpers/api.js"
  import { router } from 'tinro'
  import { user_id, email, tier } from "./helpers/store.js"
  import { SvelteEasyToast, toast } from 'svelte-easy-toast'

  let fields = { email: '', password: '' }
  let errors = { email: '', password: '', message: '', code: 0 }
  let valid = false

  function resendEmailConfirmation() { 
    let payload = { email: fields.email }
    postJSON(`resend-email-verification/`, payload, () => {
      toast({
        type: 'warning',
        position: 'top-center',
        text: `Please confirm your email address with the link sent to ${fields.email}.`,
        title: 'Confirm Email Address',
      })
    })
  }

  function submitHandler() {
    valid = true

    if (!fields.email.trim()) {
      valid = false
      errors.email = 'Email is required'
    } else if (!isEmail(fields.email.trim())) {
      valid = false
      errors.email = 'Please enter a valid email'
    } else {
      errors.email = ''
    }

    if (!fields.password.trim()) {
      valid = false
      errors.password = 'Password is required'
    } else {
      errors.password = ''
    }

    if (valid) {
      postJSON('login', { email: fields.email, password: fields.password }, (data) => {
        if (data.status == "loggedIn") {
          user_id.set(data.user_id.toString())
          email.set(data.email.toString())
          tier.set(data.tier.toString())
          router.goto("forms")
        }
        else if (data.status == "notVerified") {
          errors.message = `Please verify your email address with the link sent to ${fields.email}. If you don't see it, check your spam folder.`
          errors.code = 1
        }
        else {
          errors.message = "Invalid username or password"
          errors.code = 2
        }
      })
    }
  }
</script>

<section class="hero is-fullheight-with-navbar login-hero">
  <div class="hero-body">
    <div class="container">

      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">

          <h1 class="title has-text-centered mb-5">Welcome Back</h1>

          <!-- GOOGLE LOGIN BUTTON -->
          <a
            href="https://fabform.io/f/auth/google"
            class="button is-fullwidth is-light mb-3"
            style="display: flex; align-items: center; justify-content: center; gap: .5rem;"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width="18"
              height="18"
            />
            <span>Continue with Google</span>
          </a>

          <!-- GITHUB LOGIN BUTTON -->
          <a
            href="https://fabform.io/f/auth/github"
            class="button is-fullwidth is-dark mb-4"
            style="display: flex; align-items: center; justify-content: center; gap: .5rem;"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              width="20"
              height="20"
            />
            <span>Continue with GitHub</span>
          </a>

          <div class="or-divider">or</div>

          <!-- LOGIN FORM -->
          <form on:submit|preventDefault={submitHandler} class="box login-box" novalidate>

            <!-- EMAIL -->
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" bind:value={fields.email} type="email" placeholder="you@example.com">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                {#if errors.email}
                  <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                {/if}
              </div>
              <p class="help is-danger">{errors.email}</p>
            </div>

            <!-- PASSWORD -->
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" bind:value={fields.password} placeholder="••••••••">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                {#if errors.password}
                  <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                {/if}
              </div>
              <p class="help is-danger">{errors.password}</p>
            </div>

            <p class="has-text-right mb-3">
              <a href="/#/forgot-password" class="forgot-link">Forgot Password?</a>
            </p>

            <!-- SUBMIT BUTTON -->
            <button type="submit" class="button is-primary is-fullwidth login-btn">
              Login
            </button>

            {#if errors.code == 1}
              <button class="button is-info is-fullwidth mt-3" on:click={resendEmailConfirmation}>
                Resend Verification Email
              </button>
            {/if}

            {#if errors.message}
              <div class="notification is-warning mt-3">{errors.message}</div>
            {/if}

          </form>

          <p class="has-text-centered mt-4">
            Don’t have an account?
            <a href="/#/signup" class="signup-link">Sign Up</a>
          </p>

        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .login-hero {
    background: linear-gradient(135deg, #f8f9fb 0%, #eef1f6 100%);
  }

  .login-box {
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  /* Divider */
  .or-divider {
    text-align: center;
    margin: 1rem 0;
    color: #7a7a7a;
    font-size: .9rem;
    position: relative;
  }

  .or-divider::before,
  .or-divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #ddd;
  }

  .or-divider::before {
    left: 0;
  }

  .or-divider::after {
    right: 0;
  }

  .login-btn {
    height: 2.75rem;
    font-weight: 600;
    border-radius: 8px;
  }

  .forgot-link,
  .signup-link {
    color: #3273dc;
    font-weight: 500;
  }

  .forgot-link:hover,
  .signup-link:hover {
    text-decoration: underline;
  }
</style>

