import { getItem, setItem } from '@/store/storage';
import type { GetPokemonListParams, Pokemon } from '@/types/pokemon';

const cacheKey = ({ limit, offset }: GetPokemonListParams) =>
  `pokemon-list:${offset}:${limit}`;

/**
 * Caches each page of already-mapped `Pokemon` entities, keyed by
 * offset+limit. Reads are a cache miss (`null`) unless that exact page was
 * fetched before — good enough for "reopen the app and see the last page
 * you were on" without needing a merge/sync strategy.
 */
export function getCachedPage(
  params: GetPokemonListParams,
): Promise<Pokemon[] | null> {
  return getItem<Pokemon[]>(cacheKey(params));
}

export function cachePage(
  params: GetPokemonListParams,
  items: Pokemon[],
): Promise<void> {
  return setItem(cacheKey(params), items);
}
