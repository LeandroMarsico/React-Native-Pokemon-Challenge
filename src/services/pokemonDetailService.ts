import { ApiEndpoints } from '@/constants/apiEndpoints';
import { getPokemonArtworkUrl } from '@/constants/pokemonAssets';
import { get } from '@/services/http';
import { cacheDetail, getCachedDetail } from '@/store/pokemonDetailStore';
import { toAppError } from '@/types/errors';
import type { PokemonDetail, PokemonDetailDto } from '@/types/pokemonDetail';

/** Maps the PokéAPI detail response into the `PokemonDetail` shape the UI consumes, converting units to metric. */
export function toPokemonDetail(dto: PokemonDetailDto): PokemonDetail {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl:
      dto.sprites.other?.['official-artwork']?.front_default ??
      dto.sprites.front_default ??
      getPokemonArtworkUrl(dto.id),
    heightM: dto.height / 10,
    weightKg: dto.weight / 10,
    baseExperience: dto.base_experience,
    types: dto.types.map((t) => t.type.name),
    abilities: dto.abilities.map((a) => a.ability.name),
    stats: dto.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  };
}

/** Same network-first-with-cache-fallback strategy as {@link getPokemonList}, for a single Pokémon. */
export async function getPokemonDetail(
  idOrName: string,
): Promise<PokemonDetail> {
  try {
    const dto = await get<PokemonDetailDto>(
      ApiEndpoints.pokemonDetail(idOrName),
    );
    const detail = toPokemonDetail(dto);
    await cacheDetail(idOrName, detail);
    return detail;
  } catch (error) {
    const cached = await getCachedDetail(idOrName);
    if (cached) return cached;
    throw toAppError(error);
  }
}
