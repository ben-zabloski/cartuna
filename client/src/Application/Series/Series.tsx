import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { GET_SERIES_BY_ID } from "./SeriesQueries";
import { Series as SeriesType } from "./SeriesTypes";
// import blankImage from "../images/blankImage.png";
import "./Series.css";
import BannerImage from "Application/BannerImage/BannerImage";
import useRoute from "../../Router/useRoute";

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
    <div>
      <BannerImage
        alt={data?.getSeriesByID?.seriesName}
        className="SeriesBannerImage"
        src={data?.getSeriesByID?.banner}
      />
      Series: {data?.getSeriesByID?.seriesName}
    </div>
  );
}

export default Series;
