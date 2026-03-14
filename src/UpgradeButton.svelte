<div class="upgrade-wrapper">
  <div class="popover-container">

    <!-- MAIN BUTTON -->
    <a
      class="button is-rounded upgrade-btn"
      target="_blank"
      href="https://fabform.io/pricing"
    >
      <span class="icon m-1 gold-icon">
        <!-- Gold Infinity Icon -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#gold)">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f8e38a"/>
              <stop offset="50%" stop-color="#d9a93f"/>
              <stop offset="100%" stop-color="#b57a1a"/>
            </linearGradient>
          </defs>
          <path d="M7 9a4 4 0 100 6c2 0 3.5-1.5 5-3s3-3 5-3a4 4 0 110 6c-2 0-3.5-1.5-5-3s-3-3-5-3z"/>
        </svg>
      </span>

      <span class="m-1">
        Trial Ending — Lock In Lifetime Access
      </span>
    </a>

    <!-- POPOVER -->
    <div class="popover">
      <p class="popover-title">Your Trial Is Being Discontinued</p>
      <p class="popover-subtitle">
        Upgrade now to keep your forms active and secure your Lifetime price forever.
      </p>

      <ul class="feature-list">
        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M4 4h16v2H4zm0 7h16v2H4zm0 7h16v2H4z"/></svg></span>Unlimited form submissions</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l4 4h-3v6h-2V6H8zM6 20h12v2H6z"/></svg></span>Unlimited file uploads</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3m10-10h-3M5 12H2m15.5-7.5l-2.1 2.1M8.6 17.4l-2.1 2.1m0-14.2l2.1 2.1m8.9 8.9l2.1 2.1"/></svg></span>Custom branding & white‑label forms</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M4 4h16v10H5.17L4 15.17zM7 18h10v2H7z"/></svg></span>Auto‑responses with templates</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M4 4h16v16H4zm8 7l8-5H4z"/></svg></span>Email notifications</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M9 12l-1 5 4-3 4 3 3-14z"/></svg></span>Telegram instant alerts</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 3a4 4 0 110 8 4 4 0 010-8zm0 10a4 4 0 110 8 4 4 0 010-8zm7-5a3 3 0 110 6 3 3 0 010-6z"/></svg></span>Webhooks (JSON to any endpoint)</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M10 6h8v8h-2V9.41l-9.29 9.3-1.42-1.42L14.59 8H10z"/></svg></span>Redirects to Thank‑You pages</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M4 4h16v16H4zM7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"/></svg></span>CSV data export</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg></span>Spam protection</li>

        <li><span class="icon-bullet"><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><circle cx="12" cy="12" r="3"/><path d="M4 4h16v4H4zm0 12h16v4H4z"/></svg></span>Optional CAPTCHA</li>
      </ul>

      <div class="upgrade-cta">
        <a
          class="button is-fullwidth is-rounded upgrade-now-btn"
          target="_blank"
          href="https://fabform.io/pricing"
        >
          Secure Lifetime Access
        </a>

        <p class="urgency-text">
          Price increasing soon — lock in your rate forever
        </p>

        <p class="scarcity-text">
          Fewer than 20 Lifetime spots remaining
        </p>

        <p class="future-text">
          All future features included at no extra cost
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .upgrade-wrapper {
    position: relative;
    display: inline-block;
  }

  /* MAIN BUTTON */
  .upgrade-btn {
    background: linear-gradient(135deg, #0d1117, #1b2330);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.12);
    padding-right: 1rem;
    padding-left: 1rem;
    box-shadow: 0 4px 18px rgba(0,0,0,0.45);
    transition: all 0.18s ease;
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  .upgrade-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 26px rgba(0,0,0,0.55);
  }

  .gold-icon svg {
    filter: drop-shadow(0 0 4px rgba(255,215,0,0.35));
  }

  /* POPOVER */
  .popover-container {
    position: relative;
  }

  .popover {
    display: none;
    position: absolute;
    top: 110%;
    right: 0;
    width: 300px;
    background: #ffffff;
    border-radius: 12px;
    padding: 1.3rem 1.5rem;
    box-shadow: 0 14px 34px rgba(0,0,0,0.22);
    z-index: 20;
    border: 1px solid rgba(0,0,0,0.06);
  }

  .popover-container:hover .popover {
    display: block;
  }

  .popover-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    color: #b91c1c;
  }

  .popover-subtitle {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: #475569;
  }

  /* FEATURE LIST */
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.3rem 0;
  }

  .feature-list li {
    display: flex;
    align-items: center;
    margin-bottom: 0.55rem;
    font-size: 0.9rem;
    color: #1e293b;
  }

  .icon-bullet {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: 0.55rem;
  }

  /* CTA */
  .upgrade-now-btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    box-shadow: 0 4px 14px rgba(59,130,246,0.35);
    transition: all 0.15s ease;
    font-weight: 600;
  }

  .upgrade-now-btn:hover {
    background: #2563eb;
    box-shadow: 0 6px 20px rgba(59,130,246,0.45);
  }

  .urgency-text {
    text-align: center;
    font-size: 0.75rem;
    margin-top: 0.6rem;
    color: #dc2626;
    font-weight: 600;
  }

  .scarcity-text {
    text-align: center;
    font-size: 0.72rem;
    margin-top: 0.2rem;
    color: #b91c1c;
    font-weight: 600;
  }

  .future-text {
    text-align: center;
    font-size: 0.72rem;
    margin-top: 0.4rem;
    color: #0f172a;
    font-weight: 600;
  }
</style>

