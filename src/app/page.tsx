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
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokémon List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <caption className="mb-2 caption-bottom text-sm text-gray-600">
            A list of Pokémon
          </caption>
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-2 text-left font-semibold text-gray-700">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.results.map((pokemon) => (
              <tr key={pokemon.name} className="hover:bg-gray-50">
                <td className="border-b p-2 text-gray-800">{pokemon.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
