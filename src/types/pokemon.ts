/** A single entry in the Pokémon list: the minimum data the list screen needs. */
export interface Pokemon {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
}

export interface GetPokemonListParams {
  readonly limit: number;
  readonly offset: number;
}

/** Raw shape of `GET /pokemon?limit&offset` from PokéAPI. */
export interface PokemonListDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemDto[];
}

export interface PokemonListItemDto {
  name: string;
  /** e.g. "https://pokeapi.co/api/v2/pokemon/25/" — the numeric id is embedded in the URL. */
  url: string;
}
