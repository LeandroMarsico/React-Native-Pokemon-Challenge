/** Reducer action kinds shared by the app's data-fetching hooks (loading/success/error lifecycle). */
export enum RequestActionType {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}
