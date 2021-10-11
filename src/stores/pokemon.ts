import { writable } from 'svelte/store';

export const pokemon = writable<BasePokemon[]>([]);
const baseUrl = 'https://pokeapi.co/api/v2';

let loaded = false;

const getImage = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export interface BasePokemon {
	name: string;
	id: number;
	image: string;
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
