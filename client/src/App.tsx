import ApolloClient, { gql } from "apollo-boost";
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://cartuna-database.herokuapp.com/v1/graphql",
    });

    client
      .query({
        query: gql`
          {
            profile {
              id
              name
            }
          }
        `,
      })
      .then((result) => console.log(result));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
