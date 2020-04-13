import { RouteComponentProps, useLocation, useParams } from "@reach/router";
import React from "react";

function Series(props: RouteComponentProps) {
  const location = useLocation();
  const params = useParams();

  console.log("location", location);
  console.log("params", params);

  return <div>Series: {params.seriesID}</div>;
}

export default Series;
