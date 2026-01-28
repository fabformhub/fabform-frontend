<script>
  import { isEmail } from "./helpers/validation.js"
  import { postJSON } from "./helpers/api.js"
  import { router } from 'tinro'
  import { SvelteEasyToast, toast } from 'svelte-easy-toast'

  let fields = { email: '', password: '', confirmpassword: '' }
  let errors = { email: '', password: '', confirmpassword: '', login: '' }
  let valid = false

  function submithandler() {
    valid = true
    errors.email = ''
    errors.password = ''
    errors.confirmpassword = ''
    errors.login = ''

    if (!fields.email.trim()) {
      valid = false
      errors.email = 'Email is required'
    } else if (!isEmail(fields.email.trim())) {
      valid = false
      errors.email = 'Please enter a valid email'
    }

    if (!fields.password.trim()) {
      valid = false
      errors.password = 'Password is required'
    }

    if (!fields.confirmpassword.trim()) {
      valid = false
      errors.confirmpassword = 'Confirmation password is required'
    }

    if (fields.password && fields.confirmpassword && fields.password !== fields.confirmpassword) {
      valid = false
      errors.password = 'Password and confirmation password do not match.'
    }

    if (valid) {
      postJSON('check-email', { email: fields.email }, (data) => {
        if (data.success === true) {
          errors.login = "Email already exists in our database."
        } else {
          postJSON('signup', { email: fields.email, password: fields.password }, (data) => {
            if (data.success === true) {
              toast({
                type: 'warning',
                position: 'top-center',
                text: `Please confirm your email address with the link sent to ${fields.email}. If you can't find it, check your spam folder.`,
                title: 'Confirm Email Address',
              })
              router.goto('login')
            }
          })
        }
      })
    }
  }
</script>

<section class="hero is-fullheight-with-navbar signup-hero">
  <div class="hero-body">
    <div class="container">

      <h1 class="title has-text-centered mb-5">Create Your Account</h1>

      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">

          <!-- GOOGLE LOGIN BUTTON -->
          <a class="google-btn" href="https://fabform.io/f/auth/google">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
            <span>Continue with Google</span>
          </a>

          <div class="or-divider">or</div>

          <!-- SIGNUP FORM -->
          <form on:submit|preventDefault={submithandler} class="box signup-box" novalidate>

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

            <!-- CONFIRM PASSWORD -->
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" bind:value={fields.confirmpassword} placeholder="••••••••">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                {#if errors.confirmpassword}
                  <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                {/if}
              </div>
              <p class="help is-danger">{errors.confirmpassword}</p>
            </div>

            <!-- SUBMIT BUTTON -->
            <button type="submit" class="button is-primary is-fullwidth signup-btn">
              Create Account
            </button>

            {#if errors.login}
              <div class="notification is-warning mt-3">{errors.login}</div>
            {/if}

          </form>

          <p class="has-text-centered mt-4">
            Already have an account?
            <a href="/#/login" class="login-link">Log in</a>
          </p>

        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .signup-hero {
    background: linear-gradient(135deg, #f8f9fb 0%, #eef1f6 100%);
  }

  .signup-box {
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .75rem;
    width: 100%;
    padding: .75rem;
    border-radius: 8px;
    background: white;
    border: 1px solid #dbdbdb;
    font-weight: 600;
    transition: all .15s ease;
    margin-bottom: 1.25rem;
  }

  .google-btn img {
    width: 20px;
    height: 20px;
  }

  .google-btn:hover {
    background: #fafafa;
    border-color: #cfcfcf;
    transform: translateY(-1px);
  }

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

  .signup-btn {
    height: 2.75rem;
    font-weight: 600;
    border-radius: 8px;
  }

  .login-link {
    color: #3273dc;
    font-weight: 500;
  }

  .login-link:hover {
    text-decoration: underline;
  }
</style>

