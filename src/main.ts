import { Server } from "http";
import { createServer } from "node:http";
import { debug } from "node:util";
import "reflect-metadata";
import { yoga } from "./graphql/yoga";

const PORT = process.env.PORT || 4000;

const server: Server = createServer(yoga);
server.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
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
