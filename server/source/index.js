const { ApolloServer, gql } = require("apollo-server-express");
const fetch = require("node-fetch");

const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const CARTUNA_DATABASE_URL =
  "https://cartuna-database.herokuapp.com/v1/graphql";

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const typeDefs = gql`
    type Profile {
      id: Int
      name: String
    }

    type Query {
      profile: [Profile]
    }
  `;

  const resolvers = {
    Query: {
      profile: async (_root, { query }) => {
        try {
          const results = await fetch(CARTUNA_DATABASE_URL, {
            method: "POST",
            headers: {
              ["x-hasura-admin-secret"]: "6vcPQ77AfRqYteCK59SPXHz4j2M8JtRS",
            },
            body: { query },
          });
          const json = await results.json();

          return json;
        } catch (e) {
          console.error(e);
        }
      },
    },
  };

  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  app.use(express.static(path.resolve(__dirname, "../../client/build")));

  app.get("auth", function (request, response) {
    var hasuraVariables = {
      "X-Hasura-Role": "user",
      "X-Hasura-User-Id": "1",
    };

    response.json(hasuraVariables);
  });

  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../../client/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
