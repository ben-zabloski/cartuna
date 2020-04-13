import { gql } from "apollo-boost";

export const GET_SERIES_BY_ID = gql`
  query Series($id: String!) {
    getSeriesByID(id: $id) {
      banner
      id
      image
      seriesName
    }
  }
`;

export const GET_SERIES_BY_NAME = gql`
  query Series($name: String!) {
    getSeriesByName(name: $name) {
      banner
      id
      image
      seriesName
    }
  }
`;
