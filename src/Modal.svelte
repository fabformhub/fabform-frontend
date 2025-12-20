<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let isOpenModal 
export let title 
export let buttonText 

function success() {
  dispatch('success')
  closeModal()
}

 function closeModal() {
  isOpenModal = false;
  dispatch('closeModal', { isOpenModal });
}

</script>

{#if isOpenModal}
<div id="image-modal" class="modal is-active" >
    <div class="modal-background"></div>
    <div class="modal-content">
<section class="modal-card-body">
	<p>{title}</p>  
	<slot></slot>
</section>

<footer class="modal-card-foot">
      <button class="button is-link" on:click={success} >{buttonText}</button>
      <button class="button" on:click={closeModal} >Cancel</button>
    </footer>
 </div>
    <button id="image-modal-close" on:click={closeModal} class="modal-close"></button>
  </div>
  <br>
{/if}
