import {
  GET_SERIES_BY_ID_REQUEST,
  GET_SERIES_BY_ID_RESPONSE,
  GET_SERIES_BY_NAME_REQUEST,
  GET_SERIES_BY_NAME_RESPONSE,
} from "./HomeActions";

import { Action, State } from "./HomeTypes";

export function homeReducer(state: State, action: Action): State {
  switch (action.type) {
    case GET_SERIES_BY_ID_REQUEST:
      return state;
    case GET_SERIES_BY_ID_RESPONSE:
      return state;
    case GET_SERIES_BY_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SERIES_BY_NAME_RESPONSE:
      return {
        ...state,
        loading: false,
        series: action.result,
      };
    default:
      return state;
  }
}
