import { ApolloProvider } from "@apollo/react-hooks";
import { Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import React, { Suspense } from "react";
import HomeLoader from "./Home/HomeLoader";
import SeriesLoader from "./Series/SeriesLoader";

import "./Application.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DATABASE_URL,
});

function Application() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<div></div>}>
        <Router className="Application">
          <HomeLoader path="/" />
          <SeriesLoader path="/series/:seriesID" />
        </Router>
      </Suspense>
    </ApolloProvider>
  );
}

export default Application;
