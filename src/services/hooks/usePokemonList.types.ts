import { RequestActionType } from '@/constants/requestAction';
import { PokemonListStatus } from '@/constants/requestStatus';
import type { AppError } from '@/types/errors';
import type { Pokemon } from '@/types/pokemon';

export interface PokemonListState {
  items: Pokemon[];
  offset: number;
  hasMore: boolean;
  status: PokemonListStatus;
  error: AppError | null;
}

export enum FetchMode {
  INITIAL = 'initial',
  MORE = 'more',
}

export type PokemonListAction =
  | { type: RequestActionType.FETCH_START; mode: FetchMode }
  | {
      type: RequestActionType.FETCH_SUCCESS;
      items: Pokemon[];
      mode: FetchMode;
    }
  | { type: RequestActionType.FETCH_ERROR; error: AppError };
