import "reflect-metadata";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import {
  createInlineSigningKeyProvider,
  extractFromHeader,
  useJWT,
} from "@graphql-yoga/plugin-jwt";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import express from "express";
import { GraphQLError } from "graphql";
import {
  createYoga,
  useExecutionCancellation,
  useReadinessCheck,
} from "graphql-yoga";
import helmet from "helmet";
import { graphQLContext } from "./context/graphqlContext";
import { appModules } from "./modules";

const router = express.Router();
router.use(
  /* configure helmet for `yogo`*/
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

export const yoga = createYoga({
  healthCheckEndpoint: "/live",
  plugins: [
    useGraphQLModules(appModules),
    useJWT({
      signingKeyProviders: [
        createInlineSigningKeyProvider(process.env.JWT_SECRET ?? "x-10-yex-ht"),
      ],
      tokenLookupLocations: [
        extractFromHeader({ name: "authorization", prefix: "Bearer" }),
      ],
      tokenVerification: {
        algorithms: ["ES256", "RS256"],
        audience: process.env.JWT_AUDIENCE,
        issuer: "me20283",
      },
      extendContext: true,
      reject: {
        missingToken: false,
        invalidToken: false,
      },
    }),
    useCookies(),
    useReadinessCheck({
      /* Health check if other required service are ready to go */
      endpoint: "/ready",
      check: async () => {
        try {
          // if resolves, respond with 200 OK
          // await checkDbAvailable();

          throw new Error("Service not available!");
        } catch (err) {
          console.error(err);
          throw new GraphQLError(
            err instanceof Error ? err.message : "Service Unavailable!"
          );
        }
      },
    }),
    useCSRFPrevention({ requestHeaders: ["x-culb-csrf"] }),
    useResponseCache({ session: () => null, ttl: 4_000 }),
    useExecutionCancellation(),
  ],
  context: async (ctx) => await graphQLContext(ctx),
  logging: "debug",
  landingPage: false,
  cors: {
    credentials: true,
    methods: ["POST"],
    origin: "http://localhost:4000",
  },
  batching: {
    limit: 5,
  } /* Grouped GraphQL requests are allowed within a single HTTP request*/,
});

export const yogaRouter = router.use(yoga);
