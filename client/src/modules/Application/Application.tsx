import { Router } from "@reach/router";
import React, { Suspense } from "react";
import HomeLoader from "./Home/HomeLoader";
import SeriesLoader from "./Series/SeriesLoader";

import "./Application.css";

function Application() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Router className="Application">
        <HomeLoader path="/" />
        <SeriesLoader path="/series/:seriesID" />
      </Router>
    </Suspense>
  );
}

export default Application;
