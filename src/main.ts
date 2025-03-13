import { Server } from "http";
import { debug } from "node:util";

import app from "./app";

let server: Server;
const port = process.env.PORT || 4000;

server = app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server.");

  server.close(() => {
    debug("HTTP server closed");
  });
});
