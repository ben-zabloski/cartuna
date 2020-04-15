import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps, useParams } from "@reach/router";
import React from "react";

import { GET_SERIES_BY_ID } from "./SeriesQueries";
import { Series as SeriesType } from "./SeriesTypes";

type DataObject = {
  getSeriesByID: SeriesType;
};

function Series(props: RouteComponentProps) {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_SERIES_BY_ID, {
    variables: {
      id: params.seriesID,
    },
  });

  return (
    <div>
      <img
        alt={data?.getSeriesByID?.seriesName}
        className="SeriesCardImage"
        src={`${process.env.REACT_APP_THE_TV_DB_BANNER_URL}/${data?.getSeriesByID?.banner}`}
      />
      Series: {data?.getSeriesByID?.seriesName}
    </div>
  );
}

export default Series;
