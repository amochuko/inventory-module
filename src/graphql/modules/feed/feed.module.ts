import { createModule } from "graphql-modules";
import { DataService } from "../../../common/services/data.service";
import { MessageService } from "../../../common/services/message.service";
import { PostService } from "../../../common/services/post.service";
import { feedResolvers } from "./feed.resolvers";
import { FeedSchema } from "./typedefs/feed.graphql";

export const feedModule = createModule({
  id: "feedModule",
  dirname: import.meta.dirname,
  providers: [DataService, PostService, MessageService],
  typeDefs: [FeedSchema],
  resolvers: [feedResolvers],
  middlewares: {
    Query: {},
    Mutation: {},
  },
});
