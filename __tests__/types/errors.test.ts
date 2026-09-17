import { NotFoundError, UnknownError, toAppError } from '@/types/errors';

describe('toAppError', () => {
  it('returns AppError instances unchanged', () => {
    const error = new NotFoundError();
    expect(toAppError(error)).toBe(error);
  });

  it('maps an AbortError into a network timeout error', () => {
    const abort = new Error('aborted');
    abort.name = 'AbortError';

    expect(toAppError(abort).kind).toBe('network');
  });

  it('falls back to UnknownError for anything else', () => {
    expect(toAppError('boom')).toBeInstanceOf(UnknownError);
    expect(toAppError(new Error('boom')).kind).toBe('unknown');
  });
});
