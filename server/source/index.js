const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

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
  console.log("OMG");
  const app = express();

  app.use(express.static(path.resolve(__dirname, "../../client/build")));

  app.get("/auth", function (request, response) {
    console.log("cartuna - auth:");

    var origin = request.headers.host;
    var params = JSON.stringify(request.query);

    console.log("- origin: " + origin);
    console.log("- params: " + params);

    var hasuraVariables = {
      "X-Hasura-Role": "anonymous",
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
