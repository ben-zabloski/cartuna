import {
  GetSeriesByIDRequest,
  GetSeriesByIDResponse,
  GetSeriesByNameRequest,
  GetSeriesByNameResponse,
} from "./HomeActions";

export type Action =
  | GetSeriesByIDRequest
  | GetSeriesByIDResponse
  | GetSeriesByNameRequest
  | GetSeriesByNameResponse;

export type Series = {
  banner: string;
  id: string;
  image: string;
  seriesName: string;
};
export type State = { loading: boolean; error: boolean; series: Array<Series> };
