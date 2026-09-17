import { getItem, setItem } from '@/store/storage';
import type { PokemonDetail } from '@/types/pokemonDetail';

const cacheKey = (idOrName: string) => `pokemon-detail:${idOrName}`;

/** Caches each Pokémon's detail by id/name so it's available offline once visited. */
export function getCachedDetail(
  idOrName: string,
): Promise<PokemonDetail | null> {
  return getItem<PokemonDetail>(cacheKey(idOrName));
}

export function cacheDetail(
  idOrName: string,
  detail: PokemonDetail,
): Promise<void> {
  return setItem(cacheKey(idOrName), detail);
}
