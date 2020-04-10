import {
  GET_SERIES_BY_ID_REQUEST,
  GET_SERIES_BY_ID_RESPONSE,
  GET_SERIES_BY_NAME_REQUEST,
  GET_SERIES_BY_NAME_RESPONSE,
} from "./ApplicationActions";

import { Action, State } from "./ApplicationTypes";

export default function applicationReducer(
  state: State,
  action: Action
): State {
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
