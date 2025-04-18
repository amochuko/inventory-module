import { useGraphQLModules } from "@envelop/graphql-modules";
import { blockFieldSuggestionsPlugin } from "@escape.tech/graphql-armor-block-field-suggestions";
import { useDeferStream } from "@graphql-yoga/plugin-defer-stream";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import express from "express";
import {
  createLogger,
  createYoga,
  useExecutionCancellation,
  useExtendContext,
  useReadinessCheck,
} from "graphql-yoga";
import helmet from "helmet";
import { createContext } from "./context/custom-gql-context";
import { application } from "./modules/app";

const logger = createLogger("debug");

const yoga = createYoga({
  landingPage: ({ url, fetchAPI }) => {
    return new fetchAPI.Response(
      /* HTML */ `
        <!DOCTYPE html>
        <html>
          <head>
            <title>404 Not Found</title>
          </head>
          <body>
            <h1>404 Not Found</h1>
            <p>
              Sorry, the page (${url.pathname}) you are looking for could not be
              found.
            </p>
          </body>
        </html>
      `,
      {
        status: 404,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
  plugins: [
    useCookies(),
    // useCSRFPrevention(),
    // useJWT({
    // signingKeyProviders: [createInlineSigningKeyProvider(envs.JWT_SECRET)],
    // tokenLookupLocations: [
    //   extractFromHeader({ name: "authorization", prefix: "Bearer" }),
    // ],
    // tokenVerification: {
    //   issuer: "get the user from db",
    //   audience: "pick audience",
    //   algorithms: ["HS256", "RS256"],
    // },
    // extendContext: true,
    // reject: {
    //   missingToken: true,
    //   invalidToken: true,
    // },
    // }),
    useReadinessCheck({
      endpoint: "/ready",
      check: async () => {
        try {
          // await checkDatabaseService(); // check with connection
          return true;
        } catch (err) {
          console.error(err);

          return false;
        }
      },
    }),
    useExecutionCancellation(),
    blockFieldSuggestionsPlugin(),
    useDeferStream(),
    useGraphQLModules(application),
    useExtendContext((ctx) => {
      return {
        ...ctx,
        ...createContext(ctx),
      };
    }),
    // useResponseCache({
    //TODO: Revisit the useResponseCache config
    //   session(request, context) {
    //     return null;
    //   },
    // }),
  ],
  context: createContext,
  logging: logger,
  batching: true,
  cors: {
    origin: "http:localhost:3000",
    credentials: true,
    allowedHeaders: ["x-custom-header"],
    methods: ["POST"],
  },
});

const yogaRouter = express.Router();

yogaRouter.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "style-src": ["'self'", "unpkg.com"],
        "script-src": ["'self'", "unpkg.com", "'unsafe-inline'"],
        "img-src": ["'self'", "raw.githubusercontent.com"],
      },
    },
  })
);

yogaRouter.use(yoga);

export { yoga, yogaRouter };
