import { getItem, setItem } from '@/store/storage';
import { cachePage, getCachedPage } from '@/store/pokemonListStore';

jest.mock('@/store/storage');

const mockGetItem = getItem as jest.MockedFunction<typeof getItem>;
const mockSetItem = setItem as jest.MockedFunction<typeof setItem>;

const params = { limit: 20, offset: 0 };

beforeEach(() => {
  jest.resetAllMocks();
});

describe('pokemonListStore', () => {
  it('keys the cache by offset and limit', async () => {
    mockGetItem.mockResolvedValue(null);

    await getCachedPage(params);

    expect(mockGetItem).toHaveBeenCalledWith('pokemon-list:0:20');
  });

  it('stores the page under the same key it reads from', async () => {
    const items = [{ id: 1, name: 'bulbasaur', imageUrl: 'x' }];

    await cachePage(params, items);

    expect(mockSetItem).toHaveBeenCalledWith('pokemon-list:0:20', items);
  });
});
