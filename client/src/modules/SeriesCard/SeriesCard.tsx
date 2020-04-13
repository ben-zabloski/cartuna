import { Link } from "@reach/router";
import React from "react";
import { Series } from "../Application/Home/HomeTypes";
import "./SeriesCard.css";

function SeriesCard(props: Series) {
  return (
    <div className="SeriesCard">
      <Link to={`/series/${props.id}`}>
        <img
          alt={props.seriesName}
          className="SeriesCardImage"
          src={`${process.env.REACT_APP_THE_TV_DB_BASE_URL}${props.image}`}
        />
      </Link>
      <div className="SeriesCardSeriesName">{props.seriesName}</div>
    </div>
  );
}

export default SeriesCard;
