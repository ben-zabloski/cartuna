import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps, useMatch } from "@reach/router";
import React, { useEffect, useState } from "react";

import { GET_SERIES_BY_ID } from "./SeriesQueries";
import { Series as SeriesType } from "./SeriesTypes";
import blankImage from "../images/blankImage.png";
import "./Series.css";
import BannerImage from "Application/BannerImage/BannerImage";

interface Params {
  seriesID: string | undefined;
}

type DataObject = {
  getSeriesByID: SeriesType;
};

function Series(props: RouteComponentProps) {
  const match = useMatch("/series/:seriesID");
  const [params] = useState(match);

  const { data, loading } = useQuery(GET_SERIES_BY_ID, {
    variables: {
      id: params?.seriesID,
    },
  });

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
