import http from "node:http";
import { debug } from "node:util";
import "reflect-metadata";
import { yoga } from "./graphql/yoga";
import app from "./rest/app";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});

server.once("close", async () => {
  await yoga.dispose();
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server.");

  server.close(() => {
    debug("HTTP server closed");
  });
});
