import ApolloClient, { gql } from "apollo-boost";
import React, { useEffect, useState, Profiler } from "react";
import "./Application.css";

type Profile = {
  id: number;
  name: string;
};

function Application() {
  const [state, setState] = useState<Array<Profile> | null>(null);

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
      .then((result) => setState(result.data.profile));
  }, []);

  return (
    <div className="Application">
      <p>Cartuna</p>
      <div>
        {state &&
          state.map((profile) => <div key={profile.id}>{profile.name}</div>)}
      </div>
    </div>
  );
}

export default Application;
