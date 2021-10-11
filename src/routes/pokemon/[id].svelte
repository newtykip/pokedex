<script context="module">
	import { getPokemonById } from '../../stores/pokemon';

	export async function load(ctx) {
		const id = ctx.page.params.id;
		const pokemon = await getPokemonById(id);

		return { props: { pokemon } };
	}
</script>

<script lang="ts">
	// todo: implement stats and abilities into this page
	import type { Pokemon } from '../../stores/pokemon';
	import { capitaliseString } from '../../utils';
	export let pokemon: Pokemon;
</script>

<svelte:head>
	<title>{capitaliseString(pokemon.name)}</title>
</svelte:head>

<div class="flex flex-col items-center">
	<h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
	<p>
		Type: <strong class="capitalize">{pokemon.types[0]}</strong> | Height:
		<strong>{pokemon.height}m</strong>
		| Weight: <strong>{pokemon.weight}kg</strong>
	</p>

	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
		<img class="card-image" src={pokemon.image} alt={pokemon.name} />

		<div class="flex flex-col items-center">
			<h2 class="text-3xl text-center my-8 uppercase">Stats</h2>
			<table class="shadow-lg bg-white">
				<thead>
					<th class="bg-gray-50 border text-left px-8 py-4">Name</th>
					<th class="bg-gray-50 border text-left px-8 py-4">Value</th>
				</thead>
				<tbody>
					{#each pokemon.stats as stat}
						<tr>
							<td class="border px-8 py-4 capitalize"
								>{stat.name.toLowerCase() === 'hp'
									? 'HP'
									: stat.name}</td
							>
							<td class="border px-8 py-4">{stat.value}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
