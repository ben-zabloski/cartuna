import { ApolloProvider } from "@apollo/react-hooks";
import {
  Router,
  RouteComponentProps,
  useLocation,
  useMatch,
} from "@reach/router";
import ApolloClient from "apollo-boost";
import React, { Suspense } from "react";
import { animated, config, useTransition } from "react-spring";

import HomeLoader from "./Home/HomeLoader";
import SeriesLoader from "./Series/SeriesLoader";
import "./Application.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DATABASE_URL,
});

type ElementMap = Record<string, () => JSX.Element>;

const pages: ElementMap = {
  "/search/:term": () => <HomeLoader path="search/:term" />,
  "/series/:seriesID": () => <SeriesLoader path="series/:seriesID" />,
};

function ApplicationRoutes(props: RouteComponentProps) {
  const location = useLocation();
  const homeMatch = useMatch("/search/:term");
  const seriesMatch = useMatch("/series/:seriesID");

  const path = homeMatch?.path || seriesMatch?.path;

  console.log("path:", path);

  const transitions = useTransition(path, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  });

  if (!path) return null;

  return (
    <div className="HomeCardList">
      {transitions.reverse().map(({ item, key, props }) => {
        const Page = pages[item];

        return (
          <animated.div key={key} className="CardListTest" style={props}>
            <Suspense fallback={<div></div>}>
              <Page />
            </Suspense>
          </animated.div>
        );
      })}
    </div>
  );
}

function Application() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ApplicationRoutes path="/*" />
      </Router>
    </ApolloProvider>
  );
}

export default Application;
