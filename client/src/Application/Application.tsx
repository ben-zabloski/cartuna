import { ApolloProvider } from "@apollo/react-hooks";
import Router from "../Router/Router";
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
    <div className="Application">
      <ApolloProvider client={client}>
        <Router>
          <Suspense fallback={<div></div>}>
            <HomeLoader />
            <SeriesLoader />
          </Suspense>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default Application;
