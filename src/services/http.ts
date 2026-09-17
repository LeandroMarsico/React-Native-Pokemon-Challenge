import { NetworkError, NotFoundError, UnknownError } from '@/types/errors';

const BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Thin wrapper around the platform `fetch`. It is the single place that
 * knows HTTP is being used, so every service goes through this function
 * instead of calling `fetch` directly — swapping the transport later (or
 * mocking it in tests) never touches the services that consume it.
 *
 * @throws {NetworkError} on connectivity failure or timeout.
 * @throws {NotFoundError} when the server responds 404.
 * @throws {UnknownError} for any other non-2xx response or parse failure.
 */
export async function get<T>(
  path: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      signal: controller.signal,
    });

    if (response.status === 404) {
      throw new NotFoundError();
    }
    if (!response.ok) {
      throw new UnknownError(
        `Solicitud fallida con estado ${response.status}.`,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnknownError)
      throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('La solicitud tardó demasiado en responder.');
    }
    throw new NetworkError();
  } finally {
    clearTimeout(timeout);
  }
}
