<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let isOpenModal;
  export let title;
  export let buttonText;
  export let buttonClass = "is-primary"; // <— DEFAULT NEUTRAL BUTTON

  function success() {
    dispatch('success');
    closeModal();
  }

  function closeModal() {
    isOpenModal = false;
    dispatch('closeModal', { isOpenModal });
  }

  function handleKeydown(e) {
    if (!isOpenModal) return;
    if (e.key === "Escape") closeModal();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpenModal}
<div class="modal is-active fade-in">

  <div class="modal-background"></div>

  <div class="modal-card modal-card-clean">

    <section class="modal-card-body has-text-centered">
      <h2 class="title is-4">{title}</h2>
      <div class="content modal-message">
        <slot></slot>
      </div>
    </section>

    <footer class="modal-card-foot is-justify-content-center">
      <button class="button {buttonClass}" on:click={success}>
        {buttonText}
      </button>
      <button class="button" on:click={closeModal}>
        Cancel
      </button>
    </footer>

  </div>

</div>
{/if}

<style>
  /* Smooth fade animation */
  .fade-in {
    animation: fadeIn 0.18s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to { opacity: 1; transform: scale(1); }
  }

  /* Slightly modernize the modal card */
  .modal-card-clean {
    border-radius: 12px;
    max-width: 420px;
    width: 90%;
  }

  /* Improve spacing so it doesn't feel squished */
  .modal-card-body {
    padding: 2rem 1.75rem;
  }

  .modal-message {
    margin-top: 0.75rem;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .modal-card-foot {
    padding: 1.25rem 1.75rem;
  }
</style>

