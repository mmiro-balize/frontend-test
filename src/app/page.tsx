import Image from "next/image";
import { PokemonResponse, PokemonDetails } from "../types";

const LIMIT = 10;

const getPokemon = async (
  offset = 0,
  limit = LIMIT,
): Promise<PokemonResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return response.json() as Promise<PokemonResponse>;
};

const getPokemonDetails = async (url: string): Promise<PokemonDetails> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon details");
  }
  return response.json() as Promise<PokemonDetails>;
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  const pokemonData = await getPokemon((page - 1) * LIMIT, LIMIT);
  const pokemonDetails = await Promise.all(
    pokemonData.results.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.url);
      return { ...pokemon, details };
    }),
  );

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
              <th className="border-b p-2 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="border-b p-2 text-left font-semibold text-gray-700">
                Types
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonDetails.map((pokemon) => (
              <tr key={pokemon.name} className="hover:bg-gray-50">
                <td className="border-b p-2 text-gray-800">{pokemon.name}</td>
                <td className="border-b p-2 text-gray-800">
                  <Image
                    src={pokemon.details.sprites.front_default}
                    alt={pokemon.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="border-b p-2 text-gray-800">
                  {pokemon.details.types
                    .map((type) => type.type.name)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-4">
        {pokemonData.previous && (
          <a
            href={`?page=${page - 1}`}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            aria-disabled={!pokemonData.previous}
          >
            Previous
          </a>
        )}
        {pokemonData.next && (
          <a
            href={`?page=${page + 1}`}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Next
          </a>
        )}
      </div>
    </main>
  );
}
