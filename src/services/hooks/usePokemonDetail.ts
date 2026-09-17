import { useCallback, useEffect, useReducer } from 'react';

import { RequestActionType } from '@/constants/requestAction';
import type {
  PokemonDetailAction,
  PokemonDetailState,
} from '@/services/hooks/usePokemonDetail.types';
import { getPokemonDetail } from '@/services/pokemonDetailService';
import { toAppError } from '@/types/errors';

type Handler<T extends RequestActionType> = (
  state: PokemonDetailState,
  action: Extract<PokemonDetailAction, { type: T }>,
) => PokemonDetailState;

/** One handler per action kind — replaces a `switch` with a lookup table, keyed by `RequestActionType`. */
const handlers: { [T in RequestActionType]: Handler<T> } = {
  [RequestActionType.FETCH_START]: () => ({
    data: null,
    error: null,
  }),
  [RequestActionType.FETCH_SUCCESS]: (_state, action) => ({
    data: action.data,
    error: null,
  }),
  [RequestActionType.FETCH_ERROR]: (_state, action) => ({
    data: null,
    error: action.error,
  }),
};

function reducer(
  state: PokemonDetailState,
  action: PokemonDetailAction,
): PokemonDetailState {
  const handler = handlers[action.type] as (
    state: PokemonDetailState,
    action: PokemonDetailAction,
  ) => PokemonDetailState;
  return handler(state, action);
}

const initialState: PokemonDetailState = {
  data: null,
  error: null,
};

/** Drives the detail screen's state machine on top of `getPokemonDetail`. */
export function usePokemonDetail(idOrName: string) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = useCallback(async () => {
    dispatch({ type: RequestActionType.FETCH_START });
    try {
      const data = await getPokemonDetail(idOrName);
      dispatch({ type: RequestActionType.FETCH_SUCCESS, data });
    } catch (error) {
      dispatch({
        type: RequestActionType.FETCH_ERROR,
        error: toAppError(error),
      });
    }
  }, [idOrName]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, retry: fetch };
}
