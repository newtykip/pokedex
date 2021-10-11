import { writable } from 'svelte/store';

export const pokemon = writable<BasePokemon[]>([]);
const baseUrl = 'https://pokeapi.co/api/v2';

let loaded = false;

const getImage = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const getArtwork = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export interface BasePokemon {
	name: string;
	id: number;
	image: string;
}

interface PokemonStat {
	name: string;
	value: number;
}

interface PokemonAbility {
	name: string;
	description: string;
}

export interface Pokemon extends BasePokemon {
	height: number;
	weight: number;
	types: string[];
	stats: PokemonStat[];
	abilities: PokemonAbility[];
}

export const fetchPokemon = (amount: number = 150) => {
	if (loaded) return;

	fetch(`${baseUrl}/pokemon?limit=${amount}`)
		.then((res) => res.json())
		.then(({ results }) => {
			const loadedPokemon: BasePokemon[] = results.map((p, i: number) => {
				return {
					name: p.name,
					id: i + 1,
					image: getImage(i + 1)
				};
			});

			pokemon.set(loadedPokemon);
			loaded = true;
		});
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
	const pokemonData = await fetch(`${baseUrl}/pokemon/${id}`).then((res) =>
		res.json()
	);

	const { name, height, weight, types, stats, abilities } = pokemonData;

	return {
		name,
		id,
		image: getArtwork(id),
		height: height / 10,
		weight: weight / 10,
		types: types.map(({ type }) => type.name),
		stats: stats.map(({ base_stat: value, stat }): PokemonStat => {
			return {
				name: stat.name.replace('-', ' '),
				value
			};
		}),
		abilities: await Promise.all(
			abilities.map(async ({ ability }): Promise<PokemonAbility> => {
				const abilityData = await fetch(ability.url).then((res) =>
					res.json()
				);

				return {
					name: abilityData.name,
					description:
						abilityData['effect_entries'][0]['short_effect']
				};
			})
		)
	};
};
