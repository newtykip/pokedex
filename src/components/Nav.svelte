<script lang="ts">
	import Icon from 'svelte-awesome';
	import { github } from 'svelte-awesome/icons';
</script>

<nav class="flex justify-center w-full">
	<a class="mx-4 text-lg hover:underline" href="/">Home</a>
	<a class="mx-4" href="https://github.com/newtykins/pokedex"
		><Icon data={github} scale={2} /></a
	>
</nav>
