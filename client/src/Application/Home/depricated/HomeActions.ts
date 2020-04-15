import { SeriesSearch } from "../HomeTypes";

export const GET_SERIES_BY_ID_REQUEST = "GET_SERIES_BY_ID_REQUEST";
export const GET_SERIES_BY_ID_RESPONSE = "GET_SERIES_BY_ID_RESPONSE";
export const GET_SERIES_BY_NAME_REQUEST = "GET_SERIES_BY_NAME_REQUEST";
export const GET_SERIES_BY_NAME_RESPONSE = "GET_SERIES_BY_NAME_RESPONSE";

export interface GetSeriesByIDRequest {
  type: typeof GET_SERIES_BY_ID_REQUEST;
  id: string;
}

export interface GetSeriesByIDResponse {
  type: typeof GET_SERIES_BY_ID_RESPONSE;
  result: SeriesSearch;
  error: object | null;
}

export interface GetSeriesByNameRequest {
  type: typeof GET_SERIES_BY_NAME_REQUEST;
  name: string;
}

export interface GetSeriesByNameResponse {
  type: typeof GET_SERIES_BY_NAME_RESPONSE;
  result: Array<SeriesSearch>;
  error: object | null;
}
