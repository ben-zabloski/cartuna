import { gql } from "apollo-boost";

export const GET_SERIES_BY_ID = gql`
  query Series($id: String) {
    getSeriesByID(id: $id) {
      banner
      id
      seriesName
      overview
    }
  }
`;
