import { Comment, Feed } from "@prisma/client";
import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { setTimeout as setTimeout$ } from "node:timers/promises";
import { parseIntSafe } from "../../../common/utils/helpers";
import { FeedModule } from "./generated-types/module-types";

const logger = createLogger("debug");

export const feedResolvers: FeedModule.Resolvers = {
  Query: {
    user: async (_, __, ctx) => {
      logger.info("resolving user");

      return {
        id: "1",
        name: "Chewie",
        username:'Trader Beans'
      };
    },
    feed: async (_, args, ctx) => {
      return await ctx.feedService.feed(
        args.filterNeedle,
        args.skip,
        args.take
      );
    },
    comment: async (_, args, ctx) => {
      const comment = await ctx.feedService.commentById(parseInt(args.id));
      if (!comment) {
        return null;
      }

      return comment;
    },
  },
  Mutation: {
    postFeed: async (parent, args, ctx) => {
      return await ctx.feedService.create(args.description, args.url);
    },
    postCommentOnFeed: async (parent, args, ctx) => {
      const feedId = parseIntSafe(args.feedId);
      if (feedId === null) {
        return Promise.reject(
          new GraphQLError(
            `Cannot post a comment on non-existing feed with id '${args.feedId}'.`,
            {
              extensions: {
                code: "POST_NOT_FOUND",
              },
            }
          )
        );
      }

      return await ctx.feedService.addComment(
        String(args.body),
        parseInt(args.feedId)
      );
    },
  },
  Subscription: {
    countdown: {
      subscribe: async function* (_, args) {
        for (let i = args.from; i >= 0; i--) {
          await setTimeout$(1000);
          yield { countdown: i };
        }
      },
    },
  },
  Feed: {
    comments: async (parent: Feed, args: {}, ctx) => {
      return await ctx.feedService.commentsOnFeedID(parent.id);
    },
  },
  Comment: {
    feed: async (parent: Comment, args, ctx) => {
      return await ctx.feedService.getFeedById(parent.feedID);
    },
  },
  User: {
    bestFriend() {
      logger.info("resolved user best friend");

      return {
        id: "2",
        name: "Han Solo",
        username: "Fisher Base",
      };
    },
  },
};
