import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { requestTime } from "./middleware";
import { birdRouter, homeRouter, usersRouter } from "./routers";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routers();
  }

  configure() {
    this.app.disable("x-powered-by");

    // middleware
    this.app.use(helmet()); // maintain default helmet config
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: "10mb" }));

    if (this.app.get("env") === "test") {
      this.app.use(morgan("dev"));
    }

    this.app.use(
      compression({
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );

    this.app.use(
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

    // Yoga GraphQL
    this.app.use(requestTime);

    // function error(status: number, message: string): CustomError {
    //   const err = new Error(message) as CustomError;
    //   err.name = message;
    //   err.status = status;
    //   return err;
    // }

    process.on("uncaughtException", (err) => {
      console.error(`${err.name} ${err.message}`);
      // error(0, err.message);
    });
  }

  dbConfig() {}

  routers() {
    this.app.use(homeRouter);
    this.app.use("/birds", birdRouter);
    this.app.use("/users", usersRouter);
    // this.app.use(yoga.graphqlEndpoint, yogaRouter);

    this.app.use((req, res) => {
      // 404 response should remain at the very bottom of the stack
      res.status(400).send({ error: "Sorry can't find that!" });
    });
  }
}

export default new App().app;
