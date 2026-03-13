<div class="upgrade-wrapper">
  <div class="popover-container">

    <!-- MAIN BUTTON -->
    <a
      class="button is-rounded upgrade-btn"
      target="_blank"
      href="https://fabform.io/pricing"
    >
      <span class="icon m-1">
        <!-- Premium SVG icon -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 
          12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
        </svg>
      </span>

      <span class="m-1">
        Limited Edition — Upgrade to Lifetime
      </span>
    </a>

    <!-- POPOVER (ONLY visible on hover) -->
    <div class="popover">
      <p class="popover-title">You’re on the Limited Edition</p>
      <p class="popover-subtitle">Upgrade now to unlock the full platform:</p>

      <ul class="feature-list">
        <li><span class="bullet"></span> Unlimited form submissions</li>
        <li><span class="bullet"></span> Unlimited file uploads</li>
        <li><span class="bullet"></span> Custom branding</li>
        <li><span class="bullet"></span> Webhook integrations</li>
        <li><span class="bullet"></span> Advanced spam protection</li>
        <li><span class="bullet"></span> Priority support</li>
      </ul>

      <div class="upgrade-cta">
        <a
          class="button is-fullwidth is-rounded upgrade-now-btn"
          target="_blank"
          href="https://fabform.io/pricing"
        >
          Unlock Lifetime Access
        </a>

        <p class="urgency-text">
          Lifetime pricing — limited time only
        </p>

        <p class="scarcity-text">
          Only a few lifetime spots left
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

  /* --- MAIN BUTTON (premium dark mode) --- */
  .upgrade-btn {
    background: linear-gradient(135deg, #0d1117, #1b2330);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.08);
    padding-right: 1rem;
    padding-left: 1rem;
    box-shadow: 0 4px 18px rgba(0,0,0,0.45);
    transition: all 0.18s ease;
    font-weight: 600;
  }

  .upgrade-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 26px rgba(0,0,0,0.55);
  }

  /* --- POPOVER (hidden until hover) --- */
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
    color: #0f172a;
  }

  .popover-subtitle {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: #475569;
  }

  /* --- FEATURE LIST --- */
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

  .bullet {
    width: 6px;
    height: 6px;
    background: #3b82f6;
    border-radius: 50%;
    margin-right: 0.55rem;
  }

  /* --- CTA INSIDE POPOVER --- */
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
</style>

