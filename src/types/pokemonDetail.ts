export interface PokemonStat {
  readonly name: string;
  readonly value: number;
}

/** Full detail data shown on the detail screen. */
export interface PokemonDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly heightM: number;
  readonly weightKg: number;
  readonly baseExperience: number;
  readonly types: readonly string[];
  readonly abilities: readonly string[];
  readonly stats: readonly PokemonStat[];
}

/** Raw (partial) shape of `GET /pokemon/{idOrName}` from PokéAPI — only the fields this app uses. */
export interface PokemonDetailDto {
  id: number;
  name: string;
  /** In decimetres. */
  height: number;
  /** In hectograms. */
  weight: number;
  base_experience: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
    };
  };
}
