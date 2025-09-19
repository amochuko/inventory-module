import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { requestTime } from "./middleware";
import { birdRouter, homeRouter, usersRouter } from "./routers";
import { yoga, yogaRouter } from "../graphql/yoga";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRoutes();
  }

  private initMiddleware() {
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
        // eslint-disable-next-line no-undef
        err: NodeJS.ErrnoException,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        // Error handling
        console.error(err.stack || err);
        res.status(500).send({ error: "Something broke" });
      }
    );

    // Yoga GraphQL
    this.app.use(requestTime);

    process.on("uncaughtException", (err) => {
      console.error(`${err.name} ${err.message}`);
    });
  }

  private initDB() {}

  private initRoutes() {
    this.app.use('/', homeRouter);

    this.app.use("/birds", birdRouter);
    this.app.use("/users", usersRouter);
    this.app.use(yoga.graphqlEndpoint, yogaRouter);

    this.app.use((req, res) => {
      // 404 response should remain at the very bottom of the stack
      res.status(404).json({ error: "Sorry can't find that!" });
    });
  }
}

export default new App().app;
