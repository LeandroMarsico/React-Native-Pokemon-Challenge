const POKEMON_PATH = '/pokemon';

/** PokéAPI paths, built once here so services never construct a URL by hand. */
export const ApiEndpoints = {
  pokemonList: (limit: number, offset: number) =>
    `${POKEMON_PATH}?limit=${limit}&offset=${offset}`,
  pokemonDetail: (idOrName: string) => `${POKEMON_PATH}/${idOrName}`,
};
