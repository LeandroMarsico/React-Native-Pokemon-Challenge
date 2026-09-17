import { NetworkError } from '@/types/errors';
import { get } from '@/services/http';
import { cachePage, getCachedPage } from '@/store/pokemonListStore';
import { getPokemonList, toPokemon } from '@/services/pokemonListService';

jest.mock('@/services/http');
jest.mock('@/store/pokemonListStore');

const mockGet = get as jest.MockedFunction<typeof get>;
const mockCachePage = cachePage as jest.MockedFunction<typeof cachePage>;
const mockGetCachedPage = getCachedPage as jest.MockedFunction<
  typeof getCachedPage
>;

const params = { limit: 20, offset: 0 };

beforeEach(() => {
  jest.resetAllMocks();
});

describe('toPokemon', () => {
  it('extracts the id from the PokéAPI url and builds the sprite url', () => {
    const pokemon = toPokemon({
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    });

    expect(pokemon).toEqual({
      id: 1,
      name: 'bulbasaur',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    });
  });

  it('throws when the url does not contain an id', () => {
    expect(() =>
      toPokemon({ name: 'mystery', url: 'https://pokeapi.co/api/v2/pokemon/' }),
    ).toThrow();
  });
});

describe('getPokemonList', () => {
  it('maps and caches the page on a successful network call', async () => {
    mockGet.mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });

    const result = await getPokemonList(params);

    expect(result).toEqual([
      { id: 1, name: 'bulbasaur', imageUrl: expect.stringContaining('1.png') },
    ]);
    expect(mockCachePage).toHaveBeenCalledWith(params, result);
  });

  it('falls back to the cached page when the network call fails', async () => {
    const cached = [{ id: 1, name: 'bulbasaur', imageUrl: 'cached.png' }];
    mockGet.mockRejectedValue(new NetworkError());
    mockGetCachedPage.mockResolvedValue(cached);

    await expect(getPokemonList(params)).resolves.toBe(cached);
  });

  it('rethrows a typed error when the network fails and there is no cache', async () => {
    mockGet.mockRejectedValue(new NetworkError());
    mockGetCachedPage.mockResolvedValue(null);

    await expect(getPokemonList(params)).rejects.toBeInstanceOf(NetworkError);
  });
});
