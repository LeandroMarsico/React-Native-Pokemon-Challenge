const SPRITES_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

/** Small default sprite, used in the list — keeps rows light on a long scroll. */
export function getPokemonSpriteUrl(id: number): string {
  return `${SPRITES_BASE}/${id}.png`;
}

/** Larger official artwork, used on the detail screen. */
export function getPokemonArtworkUrl(id: number): string {
  return `${SPRITES_BASE}/other/official-artwork/${id}.png`;
}

/**
 * PokéAPI's list endpoint gives each entry a `url` instead of a bare id
 * (e.g. `.../pokemon/25/`). Both services pull the id out of it.
 */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match)
    throw new Error(`No se pudo extraer el id de Pokémon desde "${url}".`);
  return Number(match[1]);
}
