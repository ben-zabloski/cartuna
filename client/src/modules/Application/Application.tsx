import ApolloClient from "apollo-boost";
import React, { useEffect, useReducer, useState } from "react";
import {
  getSeriesByNameRequest,
  getSeriesByNameResponse,
} from "./ApplicationActionCreators";
import { GET_SERIES_BY_NAME } from "./ApplicationQueries";
import applicationReducer from "./ApplicationReducer";
import Input from "../Input/Input";
import "./Application.css";

const client = new ApolloClient({
  uri: "https://cartuna-database.herokuapp.com/v1/graphql",
});

function Application() {
  const [{ series }, dispatch] = useReducer(applicationReducer, {
    loading: false,
    error: false,
    series: [],
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    //dispatch(getSeriesByNameRequest(input));

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
