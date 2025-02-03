import { createModule } from "graphql-modules";
import { hasApiKey } from "../../middleware/hasApiKey.mw";
import { infoResolvers } from "./info.resolvers";
import { InfoSchema } from "./typedefs/info.graphql";

export const infoModule = createModule({
  id: "infoModule",
  dirname: import.meta.dirname,
  // providers: [DataService, PostService, MessageService],
  typeDefs: [InfoSchema],
  resolvers: [infoResolvers],
  middlewares: {
    // "*": { // intercept all fields of all possible types
    //   "*": [hasApiKey],
    // },
    Query: {
      // info: [hasApiKey], // intercept a single field of type Query
      "*": [hasApiKey], // intercept all fields of type Query
    },
    Mutation: {
      "*": [hasApiKey], // intercept all fields of type Query
    },
  },
});
