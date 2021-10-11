<script lang="ts">
	import { fetchPokemon, pokemon } from '../stores/pokemon';
	import PokemonCard from '../components/PokemonCard.svelte';

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		if (searchTerm) {
			filteredPokemon = $pokemon.filter((p) =>
				p.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemon];
		}
	}

	fetchPokemon(150);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Pokedex</h1>
<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	bind:value={searchTerm}
	placeholder="Search Pokemon"
/>
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as p}
		<PokemonCard pokemon={p} />
	{/each}
</div>
