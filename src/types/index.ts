import { z } from "zod";

const PokemonSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
});

export type PokemonResponse = z.infer<typeof PokemonSchema>;
