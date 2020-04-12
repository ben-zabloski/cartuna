import React from "react";
import { Series } from "../Application/ApplicationTypes";
import "./SeriesCard.css";

function SeriesCard(props: Series) {
  return (
    <div className="SeriesCard">
      <img
        alt={props.seriesName}
        className="SeriesCardImage"
        src={`${process.env.REACT_APP_THE_TV_DB_BASE_URL}${props.image}`}
      />
      <div className="SeriesCardSeriesName">{props.seriesName}</div>
    </div>
  );
}

export default SeriesCard;
