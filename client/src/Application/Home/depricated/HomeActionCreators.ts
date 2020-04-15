import {
  GET_SERIES_BY_ID_REQUEST,
  GET_SERIES_BY_ID_RESPONSE,
  GET_SERIES_BY_NAME_REQUEST,
  GET_SERIES_BY_NAME_RESPONSE,
} from "./HomeActions";

import {
  GetSeriesByIDRequest,
  GetSeriesByIDResponse,
  GetSeriesByNameRequest,
  GetSeriesByNameResponse,
} from "./HomeActions";

import { SeriesSearch } from "../HomeTypes";

export function getSeriesByIDRequest(id: string): GetSeriesByIDRequest {
  return {
    type: GET_SERIES_BY_ID_REQUEST,
    id,
  };
}

export function getSeriesByIDResponse(
  result: SeriesSearch,
  error: object | null
): GetSeriesByIDResponse {
  return {
    type: GET_SERIES_BY_ID_RESPONSE,
    result,
    error,
  };
}

export function getSeriesByNameRequest(name: string): GetSeriesByNameRequest {
  return {
    type: GET_SERIES_BY_NAME_REQUEST,
    name,
  };
}

export function getSeriesByNameResponse(
  result: Array<SeriesSearch>,
  error: object | null
): GetSeriesByNameResponse {
  return {
    type: GET_SERIES_BY_NAME_RESPONSE,
    result,
    error,
  };
}
