import { gql } from "apollo-boost";

export const GET_SERIES_BY_ID = gql`
  query Series($id: String!) {
    getSeriesByID(id: $id) {
      id
      seriesName
    }
  }
`;

export const GET_SERIES_BY_NAME = gql`
  query Series($name: String!) {
    getSeriesByName(name: $name) {
      id
      seriesName
    }
  }
`;
