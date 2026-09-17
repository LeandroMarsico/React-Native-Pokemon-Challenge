import { useCallback, useEffect, useReducer } from 'react';

import { RequestActionType } from '@/constants/requestAction';
import { PokemonListStatus } from '@/constants/requestStatus';
import {
  FetchMode,
  type PokemonListAction,
  type PokemonListState,
} from '@/services/hooks/usePokemonList.types';
import { getPokemonList } from '@/services/pokemonListService';
import { toAppError } from '@/types/errors';

const PAGE_SIZE = 20;

type Handler<T extends RequestActionType> = (
  state: PokemonListState,
  action: Extract<PokemonListAction, { type: T }>,
) => PokemonListState;

/** One handler per action kind — replaces a `switch` with a lookup table, keyed by `RequestActionType`. */
const handlers: { [T in RequestActionType]: Handler<T> } = {
  [RequestActionType.FETCH_START]: (state, action) => ({
    ...state,
    status:
      action.mode === FetchMode.MORE
        ? PokemonListStatus.LOADING_MORE
        : state.items.length > 0
          ? PokemonListStatus.REFRESHING
          : PokemonListStatus.LOADING,
    error: null,
  }),
  [RequestActionType.FETCH_SUCCESS]: (state, action) => {
    const items =
      action.mode === FetchMode.INITIAL
        ? action.items
        : [...state.items, ...action.items];
    return {
      items,
      offset: state.offset + action.items.length,
      hasMore: action.items.length === PAGE_SIZE,
      status:
        items.length === 0
          ? PokemonListStatus.EMPTY
          : PokemonListStatus.SUCCESS,
      error: null,
    };
  },
  [RequestActionType.FETCH_ERROR]: (state, action) => ({
    ...state,
    status: PokemonListStatus.ERROR,
    error: action.error,
  }),
};

function reducer(
  state: PokemonListState,
  action: PokemonListAction,
): PokemonListState {
  const handler = handlers[action.type] as (
    state: PokemonListState,
    action: PokemonListAction,
  ) => PokemonListState;
  return handler(state, action);
}

const initialState: PokemonListState = {
  items: [],
  offset: 0,
  hasMore: true,
  status: PokemonListStatus.LOADING,
  error: null,
};

/** Drives the list screen's state machine and incremental pagination on top of `getPokemonList`. */
export function usePokemonList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPage = useCallback(async (mode: FetchMode, offset: number) => {
    dispatch({ type: RequestActionType.FETCH_START, mode });
    try {
      const items = await getPokemonList({ limit: PAGE_SIZE, offset });
      dispatch({ type: RequestActionType.FETCH_SUCCESS, items, mode });
    } catch (error) {
      dispatch({
        type: RequestActionType.FETCH_ERROR,
        error: toAppError(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchPage(FetchMode.INITIAL, 0);
  }, [fetchPage]);

  const refresh = useCallback(
    () => fetchPage(FetchMode.INITIAL, 0),
    [fetchPage],
  );

  const loadMore = useCallback(() => {
    const isBusy =
      state.status === PokemonListStatus.LOADING ||
      state.status === PokemonListStatus.REFRESHING ||
      state.status === PokemonListStatus.LOADING_MORE;
    if (isBusy || !state.hasMore) return;
    fetchPage(FetchMode.MORE, state.offset);
  }, [fetchPage, state.hasMore, state.offset, state.status]);

  return { ...state, refresh, loadMore };
}
