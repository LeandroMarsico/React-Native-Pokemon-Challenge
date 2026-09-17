import { ApiEndpoints } from '@/constants/apiEndpoints';
import {
  extractIdFromUrl,
  getPokemonSpriteUrl,
} from '@/constants/pokemonAssets';
import { get } from '@/services/http';
import { cachePage, getCachedPage } from '@/store/pokemonListStore';
import { toAppError } from '@/types/errors';
import type {
  GetPokemonListParams,
  Pokemon,
  PokemonListDto,
  PokemonListItemDto,
} from '@/types/pokemon';

/** Maps one PokéAPI list entry into the `Pokemon` shape the UI consumes. */
export function toPokemon(dto: PokemonListItemDto): Pokemon {
  const id = extractIdFromUrl(dto.url);
  return { id, name: dto.name, imageUrl: getPokemonSpriteUrl(id) };
}

/**
 * Fetches one page of Pokémon, network-first with cache fallback: try the
 * network so the list is always as fresh as possible, and only fall back to
 * the last cached page when the request fails (offline, timeout, server
 * error). A successful response always refreshes the cache.
 */
export async function getPokemonList(
  params: GetPokemonListParams,
): Promise<Pokemon[]> {
  try {
    const dto = await get<PokemonListDto>(
      ApiEndpoints.pokemonList(params.limit, params.offset),
    );
    const items = dto.results.map(toPokemon);
    await cachePage(params, items);
    return items;
  } catch (error) {
    const cached = await getCachedPage(params);
    if (cached) return cached;
    throw toAppError(error);
  }
}
