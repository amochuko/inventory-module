import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { Server } from "http";
import morgan from "morgan";
import { debug } from "node:util";
import { yoga, yogaRouter } from "./graphql/yoga";
import { requestTime } from "./rest/middleware";
import { birdRouter, homeRouter, usersRouter } from "./rest/routers";
import { CustomError } from "./utils/types";

const app = express();
app.disable("x-powered-by");
const test = app.get("env") === "test";
const port = process.env.PORT || 4000;

// middlewares
app.use(yoga.graphqlEndpoint, yogaRouter);

app.use(helmet()); // maintain default helmet config
app.use(cors());
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (!test) app.use(morgan("dev"));
app.use(requestTime);

app.use(homeRouter);
app.use("/birds", birdRouter);
app.use("/users", usersRouter);

app.use(
  (
    err: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Error handling
    console.error(err);
    res.status(500).send({ error: "Something broke" });
  }
);

app.use(
  (
    err: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!test) console.error(err.stack);

    res.status(typeof err.code === "number" ? err.code : 500);
    res.send({ error: err.message });
  }
);

app.use((req, res) => {
  // 404 response should remain at the very bottom of the stack
  res.status(400).send({ error: "Sorry can't find that!" });
});

function error(status: number, message: string): CustomError {
  const err = new Error(message) as CustomError;
  err.name = message;
  err.status = status;
  return err;
}

process.on("uncaughtException", (err) => {
  console.error(`${err.name} ${err.message}`);
  error(0, err.message);
});

let server: Server;
if (exports.main === module.children) {
  server = app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
  });
}

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server.");

  server.close(() => {
    debug("HTTP server closed");
  });
});
