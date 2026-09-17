/** Status of the Pokémon list request lifecycle, driving which view the list screen shows. */
export enum PokemonListStatus {
  LOADING = 'loading',
  REFRESHING = 'refreshing',
  LOADING_MORE = 'loading-more',
  SUCCESS = 'success',
  EMPTY = 'empty',
  ERROR = 'error',
}
