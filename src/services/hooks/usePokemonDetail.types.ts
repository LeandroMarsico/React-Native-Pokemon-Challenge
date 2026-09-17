import { RequestActionType } from '@/constants/requestAction';
import type { AppError } from '@/types/errors';
import type { PokemonDetail } from '@/types/pokemonDetail';

/**
 * No separate `status` field: `data`/`error` alone determine the screen's state
 * (both null → loading, `data` set → success, `error` set → error). Adding a
 * `status` tag would just duplicate what these two fields already say.
 */
export interface PokemonDetailState {
  data: PokemonDetail | null;
  error: AppError | null;
}

export type PokemonDetailAction =
  | { type: RequestActionType.FETCH_START }
  | { type: RequestActionType.FETCH_SUCCESS; data: PokemonDetail }
  | { type: RequestActionType.FETCH_ERROR; error: AppError };
