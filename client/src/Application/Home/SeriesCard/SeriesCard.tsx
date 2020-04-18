import Link from "../../../Router/Link";
import React from "react";
import { SeriesSearch } from "../HomeTypes";
import "./SeriesCard.css";

function SeriesCard(props: SeriesSearch) {
  return (
    <div className="SeriesCard">
      <Link href={`/series/${props.id}`}>
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
