import { useQuery } from "@apollo/react-hooks";
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

function Series() {
  const route = useRoute("/series/:seriesID");
  const [seriesID, setSeriesID] = useState<string>();
  const [seriesData, setSeriesData] = useState<DataObject>();

  const { data, loading } = useQuery(GET_SERIES_BY_ID, {
    variables: {
      id: seriesID,
      skip: !route,
    },
  });

  useEffect(() => {
    if (route) setSeriesID(route.params.seriesID);
  }, [route]);

  useEffect(() => {
    setSeriesData(data);
  }, [data]);

  return (
    <RouteTransition path="/series/:seriesID">
      <div className="Series">
        <BannerImage
          alt={seriesData?.getSeriesByID?.seriesName}
          src={seriesData?.getSeriesByID?.banner}
        />
        <div className="SeriesText">
          Series: {seriesData?.getSeriesByID?.seriesName}
        </div>
      </div>
    </RouteTransition>
  );
}

export default Series;
