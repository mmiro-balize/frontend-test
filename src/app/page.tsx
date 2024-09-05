import { PokemonResponse } from "../types";

const getPokemon = async (): Promise<PokemonResponse> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  return response.json() as Promise<PokemonResponse>;
};

export default async function HomePage() {
  const pokemonData = await getPokemon();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-100 text-black">
      <h1 className="mb-4 text-2xl font-bold">Pokémon List</h1>
      <ul>
        {pokemonData.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </main>
  );
}
