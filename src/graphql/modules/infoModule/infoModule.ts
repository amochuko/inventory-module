import { createModule } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { DataService } from "../../../common/services/data.service";
import { MESSAGE_ADDED, MessageService } from "../common/message.service";
import { hasApiKey } from "../middleware/hasApiKey.mw";
import { PostService } from "../postModule/post.service";
import { InfoSchema } from "./info.graphql";

export const infoModule = createModule({
  id: "infoModule",
  dirname: import.meta.dirname,
  providers: [DataService, PostService, MessageService],
  typeDefs: [InfoSchema],
  resolvers: {
    Query: {
      messages: (_, __, ctx) => {
        const all = ctx.injector.get(MessageService).all();
        return all;
      },
      hello: (_, __, ctx) => {
        const post = ctx.injector.get(PostService);
        return post.allPosts()[0].content;
      },
      info: async (parent, args, ctx, info) => {
        const dataService = ctx.injector.get(DataService);

        return `Information Logic with DI age of ${dataService.age()}!`;
      },
    },
    Mutation: {
      sendMessage: (_, args, ctx) => {
        console.log(ctx.injector.get(MessageService));
        // return ctx.injector.get(MessageService).send(args.message);
      },
    },
    Subscription: {
      messageAdded: {
        subscribe: (_, __, ctx) => {
          return ctx.injector.get(PubSub).asyncIterator([MESSAGE_ADDED]);
        },
      },
    },
  },
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
