import { createModule } from "graphql-modules";
import { feedResolvers } from "./feed.resolver";
import { FeedService } from "./feed.service";
import { feedSchema } from "./typedefs/feed.schema";
import FeedDAO from "./feed.dao";

export const feedModule = createModule({
  id: "feedModule",
  dirname: __dirname,
  providers: [FeedService, FeedDAO],
  middlewares: {},
  typeDefs: [feedSchema],
  resolvers: feedResolvers,
});
