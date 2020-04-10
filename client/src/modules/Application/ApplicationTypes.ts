import {
  GetSeriesByIDRequest,
  GetSeriesByIDResponse,
  GetSeriesByNameRequest,
  GetSeriesByNameResponse,
} from "./ApplicationActions";

export type Action =
  | GetSeriesByIDRequest
  | GetSeriesByIDResponse
  | GetSeriesByNameRequest
  | GetSeriesByNameResponse;

export type Series = { id: string; seriesName: string };
export type State = { loading: boolean; error: boolean; series: Array<Series> };
