<script>
 import {user_id} from "./helpers/store.js"
</script>

{#if $user_id}
<slot name="authed"></slot>
{:else}
<slot name="not_authed"></slot>
{/if}

