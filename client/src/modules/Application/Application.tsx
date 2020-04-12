import ApolloClient from "apollo-boost";
import React, { useEffect, useReducer, useState } from "react";
import { getSeriesByNameResponse } from "./ApplicationActionCreators";
import { GET_SERIES_BY_NAME } from "./ApplicationQueries";
import applicationReducer from "./ApplicationReducer";
import Input from "../Input/Input";
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
    client
      .query({
        query: GET_SERIES_BY_NAME,
        variables: { name: input },
      })
      .then((result) => {
        dispatch(getSeriesByNameResponse(result.data.getSeriesByName, null));
      });
  }, [input]);

  return (
    <div className="Application">
      <p>Cartuna</p>
      <Input onChange={(value) => setInput(value)} debounce={2000} />
      <div>
        {series &&
          series.map((series) => (
            <div key={series.id}>{series.seriesName}</div>
          ))}
      </div>
    </div>
  );
}

export default Application;
