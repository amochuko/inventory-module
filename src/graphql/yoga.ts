import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import {
  createInlineSigningKeyProvider,
  extractFromHeader,
  useJWT,
} from "@graphql-yoga/plugin-jwt";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { GraphQLError } from "graphql";
import {
  createYoga,
  useExecutionCancellation,
  useReadinessCheck,
} from "graphql-yoga";
import { createServer } from "http";
import { graphQLContext } from "../context/graphqlContext";
import { schema } from "./schema";

// const router = express.Router();

// configure helmet for `yogo`
// router.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         "style-src": ["'self'", "unpkg.com"],
//         "script-src": ["'self'", "unpkg.com", "'unsafe-inline'"],
//         "img-src": ["'self'", "raw.githubusercontent.com"],
//       },
//     },
//   })
// );

// Status: 200 OK  Time: 5.03 s  Size: 149 B

const yoga = createYoga({
  healthCheckEndpoint: "/live",
  plugins: [
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
  schema,
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

// export const yogaRouter = router.use(yoga);
const yogaServer = createServer(yoga);
yogaServer.listen(9000, () => {
  console.log(`Server is running on http://localhost:9000/graphql`);
});
