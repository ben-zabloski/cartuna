import ApolloClient from "apollo-boost";
import React, { useEffect, useReducer, useState } from "react";
import { getSeriesByNameResponse } from "./ApplicationActionCreators";
import { GET_SERIES_BY_NAME } from "./ApplicationQueries";
import applicationReducer from "./ApplicationReducer";
import CardList from "../CardList/CardList";
import SeriesCard from "../SeriesCard/SeriesCard";
import Input from "../Input/Input";
import cartunaLogo from "./images/cartuna192.png";
import "./Application.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DATABASE_URL,
});

function Application() {
  const [{ series }, dispatch] = useReducer(applicationReducer, {
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
    <div className="Application">
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
    </div>
  );
}

export default Application;
