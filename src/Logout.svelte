<script>
import {router} from 'tinro';
import {user_id} from "./helpers/store.js"
import { SvelteEasyToast, toast } from 'svelte-easy-toast';
user_id.set('')
	router.goto("/")
	 toast({
	type: 'success', // dark, danger, success, info, warning, default, error
	position: 'top-center', // top-left, top-center, bottom-left, bottom-right, bottom-center
	text: `You have successfully logged out`,
	title: 'Logging out ...',
	});
</script>
