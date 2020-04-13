import ApolloClient from "apollo-boost";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useReducer, useState } from "react";

import { homeReducer } from "./HomeReducer";
import CardList from "modules/CardList/CardList";
import SeriesCard from "modules/SeriesCard/SeriesCard";
import Input from "modules/Input/Input";

import cartunaLogo from "./images/cartuna192.png";
import { getSeriesByNameResponse } from "./HomeActionCreators";
import { GET_SERIES_BY_NAME } from "./HomeQueries";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DATABASE_URL,
});

function Home(props: RouteComponentProps) {
  const [{ series }, dispatch] = useReducer(homeReducer, {
    loading: false,
    error: false,
    series: [],
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input) return;

    client
      .query({
        query: GET_SERIES_BY_NAME,
        variables: { name: input },
      })
      .then((result) => {
        dispatch(
          getSeriesByNameResponse(result.data.getSeriesByName.slice(0, 6), null)
        );
      });
  }, [input]);

  return (
    <>
      <div className="ApplicationHeader">
        <img src={cartunaLogo} />
        <div className="ApplicationInput">
          <div className="ApplicationTitle">Cartuna</div>
          <Input onChange={(value) => setInput(value)} debounce={2000} />
        </div>
      </div>
      <CardList>
        {series &&
          series.map((series) => <SeriesCard key={series.id} {...series} />)}
      </CardList>
    </>
  );
}

export default Home;
