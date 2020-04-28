import { useQuery, useApolloClient } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";

import { GET_SERIES_BY_ID } from "./SeriesQueries";
import { Series as SeriesType } from "./SeriesTypes";
// import blankImage from "../images/blankImage.png";
import "./Series.css";
import BannerImage from "Application/BannerImage/BannerImage";
import useRoute from "../../Router/useRoute";
import RouteTransition from "Application/RouteTransition/RouteTransition";

type DataObject = {
  getSeriesByID: SeriesType;
};

type DataMap = Record<string, DataObject>;

function Series() {
  const apolloClient = useApolloClient();

  const route = useRoute("/series/:seriesID");
  const [seriesID, setSeriesID] = useState<string>();
  const [seriesData, setSeriesData] = useState<DataObject>();
  const [queryCache, setQueryCache] = useState<DataMap>({});

  const { data, loading, variables } = useQuery(GET_SERIES_BY_ID, {
    variables: {
      id: seriesID,
      skip: !route,
    },
  });

  useEffect(() => {
    if (route) setSeriesID(route.params.seriesID);
  }, [route]);

  useEffect(() => {
    if (!variables.id) return;

    setQueryCache({ ...queryCache, ...{ [variables.id]: data } });

    console.log("data:", data);
  }, [data]);

  return (
    <RouteTransition path="/series/:seriesID">
      {(route) => {
        return queryCache[route.params.seriesID] ? (
          <div className="Series">
            <BannerImage
              alt={queryCache[route.params.seriesID]?.getSeriesByID?.seriesName}
              src={queryCache[route.params.seriesID]?.getSeriesByID?.banner}
            />
            <div className="SeriesText">
              {queryCache[route.params.seriesID]
                ? queryCache[route.params.seriesID]?.getSeriesByID?.overview
                : ""}
            </div>
          </div>
        ) : null;
      }}
    </RouteTransition>
  );
}

export default Series;
