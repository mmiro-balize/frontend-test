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

const PokemonDetailsSchema = z.object({
  id: z.number(),
  sprites: z.object({
    front_default: z.string().url(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
});

export type PokemonResponse = z.infer<typeof PokemonSchema>;
export type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;
