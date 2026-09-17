import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin wrapper around AsyncStorage that handles JSON (de)serialization.
 * Every per-feature store file (`pokemonListStore`, `pokemonDetailStore`)
 * goes through these functions instead of importing AsyncStorage directly,
 * so the persistence mechanism stays swappable and mockable in tests.
 *
 * Reads are best-effort: a missing key or a corrupt entry resolves to
 * `null` rather than throwing, since a cache miss should fall back to the
 * network, not crash the screen. Writes intentionally swallow errors too —
 * failing to cache a response must never block showing it to the user.
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    return;
  }
}
