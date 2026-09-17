/**
 * Base type for errors that cross a module boundary (store/services -> hooks -> UI).
 * Screens switch on `AppError` subclasses to render a friendly, actionable message
 * instead of a raw stack trace.
 */
export abstract class AppError extends Error {
  abstract readonly kind: 'network' | 'not-found' | 'storage' | 'unknown';
}

/** Thrown when a request fails to reach the server: no connectivity, DNS, or timeout. */
export class NetworkError extends AppError {
  readonly kind = 'network' as const;

  constructor(message = 'No se pudo conectar con el servidor.') {
    super(message);
    this.name = 'NetworkError';
  }
}

/** Thrown when the API responds but the requested resource does not exist (HTTP 404). */
export class NotFoundError extends AppError {
  readonly kind = 'not-found' as const;

  constructor(message = 'El recurso solicitado no existe.') {
    super(message);
    this.name = 'NotFoundError';
  }
}

/** Thrown when reading from or writing to local storage fails. */
export class StorageError extends AppError {
  readonly kind = 'storage' as const;

  constructor(message = 'No se pudo acceder al almacenamiento local.') {
    super(message);
    this.name = 'StorageError';
  }
}

/** Fallback for any error that does not map to a known category. */
export class UnknownError extends AppError {
  readonly kind = 'unknown' as const;

  constructor(message = 'Ocurrió un error inesperado.') {
    super(message);
    this.name = 'UnknownError';
  }
}

/** Normalizes any thrown value into a typed {@link AppError}. */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (error instanceof Error && error.name === 'AbortError')
    return new NetworkError('La solicitud tardó demasiado.');
  return new UnknownError(error instanceof Error ? error.message : undefined);
}
