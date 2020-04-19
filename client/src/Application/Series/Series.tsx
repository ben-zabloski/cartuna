import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { GET_SERIES_BY_ID } from "./SeriesQueries";
import { Series as SeriesType } from "./SeriesTypes";
// import blankImage from "../images/blankImage.png";
import "./Series.css";
import BannerImage from "Application/BannerImage/BannerImage";
import useRoute from "../../Router/useRoute";
import RouteTransition from "Application/RouteTransition/RouteTransition";

interface Params {
  seriesID: string | undefined;
}

type DataObject = {
  getSeriesByID: SeriesType;
};

function Series() {
  const route = useRoute("/series/:seriesID");
  console.log("Series route:", route);

  const { data, loading } = useQuery(GET_SERIES_BY_ID, {
    variables: {
      id: route?.params.seriesID,
    },
  });

  if (!route) return null;

  return loading ? null : (
    <RouteTransition path="/series/:seriesID">
      <div className="Series">
        <BannerImage
          alt={data?.getSeriesByID?.seriesName}
          src={data?.getSeriesByID?.banner}
        />
        <div className="SeriesText">
          Series: {data?.getSeriesByID?.seriesName}
        </div>
      </div>
    </RouteTransition>
  );
}

export default Series;
