import { useGraphQLModules } from "@envelop/graphql-modules";
import { blockFieldSuggestionsPlugin } from "@escape.tech/graphql-armor-block-field-suggestions";
import { useDeferStream } from "@graphql-yoga/plugin-defer-stream";
import { usePrometheus } from "@graphql-yoga/plugin-prometheus";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
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
import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";

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
  graphiql: (request, { req, res }: any) => {
    // Lock for only 'admin' - access something attached to the request object
    // e.g. a user object added by an auth middleware.
    if (req.user?.role === "admin" || process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  },
  plugins: [
    useGraphQLModules(application),
    useResponseCache({
      session: () => null,
    }),
    useCookies(),
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
    useExtendContext((ctx) => {
      return {
        ctx,
        // ...createContext(ctx),
      };
    }),
    usePrometheus({
      endpoint:
        "/metrics" /** You can then configure Prometheus to scrape the metrics from your server by using this URL. */,
      metrics: {
        // By default, these are the metrics that are enabled:
        graphql_envelop_request_time_summary: true,
        graphql_envelop_phase_parse: true,
        graphql_envelop_phase_validate: true,
        graphql_envelop_phase_context: true,
        graphql_envelop_phase_execute: true,
        graphql_envelop_phase_subscribe: true,
        graphql_envelop_error_result: true,
        graphql_envelop_deprecated_field: true,
        graphql_envelop_request_duration: true,
        graphql_envelop_schema_change: true,
        graphql_envelop_request: true,
        graphql_yoga_http_duration: true,

        // This metric is disabled by default.
        // Warning: enabling resolvers level metrics will introduce significant overhead
        graphql_envelop_execute_resolver: false,
      },
    }),
    useCSRFPrevention(),
    useResponseCache({
      //TODO: Revisit the useResponseCache config
      session: () => null,
      // cache based on the authentication header
      // session: (request) => request.headers.get("authentication"),
    }),
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
  ],
  context: createContext,
  logging: logger,
  batching: true,
  cors: {
    origin: "http://localhost:3000",
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
