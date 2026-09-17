import { toPokemonDetail } from '@/services/pokemonDetailService';
import type { PokemonDetailDto } from '@/types/pokemonDetail';

const baseDto: PokemonDetailDto = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  stats: [{ base_stat: 35, stat: { name: 'hp' } }],
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/pikachu-artwork.png',
      },
    },
  },
};

describe('toPokemonDetail', () => {
  it('converts decimetres/hectograms to metres/kilograms', () => {
    const detail = toPokemonDetail(baseDto);

    expect(detail.heightM).toBe(0.4);
    expect(detail.weightKg).toBe(6);
  });

  it('prefers the official artwork sprite when available', () => {
    expect(toPokemonDetail(baseDto).imageUrl).toBe(
      'https://example.com/pikachu-artwork.png',
    );
  });

  it('falls back to the default sprite, then to a generated artwork url', () => {
    const withoutArtwork = {
      ...baseDto,
      sprites: { front_default: 'https://example.com/default.png' },
    };
    expect(toPokemonDetail(withoutArtwork).imageUrl).toBe(
      'https://example.com/default.png',
    );

    const withoutSprites = { ...baseDto, sprites: { front_default: null } };
    expect(toPokemonDetail(withoutSprites).imageUrl).toContain(
      'official-artwork/25.png',
    );
  });

  it('flattens types, abilities and stats into plain arrays', () => {
    const detail = toPokemonDetail(baseDto);

    expect(detail.types).toEqual(['electric']);
    expect(detail.abilities).toEqual(['static']);
    expect(detail.stats).toEqual([{ name: 'hp', value: 35 }]);
  });
});
