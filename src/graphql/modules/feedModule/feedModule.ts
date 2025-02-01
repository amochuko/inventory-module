import { Comment, Feed, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { createModule } from "graphql-modules";
import { setTimeout as setTimeout$ } from "node:timers/promises";
import { DataService } from "../../../common/services/data.service";
import { MessageService } from "../common/message.service";
import { PostService } from "../postModule/post.service";
import { FeedSchema } from "./feed.graphql";

const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10);
  }

  return null;
};

const applyTakeConstraints = (params: {
  min: number;
  max: number;
  value: number;
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
    );
  }

  return params.value;
};

export const feedModule = createModule({
  id: "feedModule",
  dirname: import.meta.dirname,
  providers: [DataService, PostService, MessageService],
  typeDefs: [FeedSchema],
  resolvers: {
    Query: {
      cookie: async (_, args, ctx) => {
        const cookie = await ctx.request.cookieStore?.get(args.name);
        console.log({ cookie });

        return cookie?.value ?? undefined;
      },
      slow: async () => {
        return await new Promise((res, rej) => {
          setTimeout(() => {
            res("I am slow!");
          }, 5000);
        });
      },
      user: async (_, __, ctx) => {
        logger.info("resolving user");

        await new Promise((res, rej) => {
          const timeout = setTimeout(res, 5000);

          ctx.request.signal.addEventListener("abort", () => {
            clearTimeout(timeout);
            rej(ctx.request.signal.aborted);
          });
        });

        logger.info("resolved user");

        return {
          id: "1",
          name: "Chewie",
        };
      },
      feed: async (
        _,
        args: { filterNeedle?: string; skip?: number; take?: number },
        ctx
      ) => {
        return await ctx.prisma.feed.findMany({
          where: args.filterNeedle
            ? {
                OR: [
                  { description: { contains: args.filterNeedle } },
                  { url: { contains: args.filterNeedle } },
                ],
              }
            : {},
          skip: args.skip,
          take: applyTakeConstraints({
            min: 1,
            max: 50,
            value: args.take ?? 30,
          }),
        });
      },
      comment: async (_, args: { id: string }, ctx) => {
        return await ctx.prisma.comment.findFirst({
          where: { id: parseInt(args.id) },
        });
      },
    },
    Mutation: {
      setCookie: async (root, args, ctx) => {
        await ctx.request.cookieStore?.set(args.name, args.value);

        return args.value;
      },
      postFeed: async (
        parent: unknown,
        args: { url: string; description: string },
        ctx
      ) => {
        return await ctx.prisma.feed.create({
          data: { description: args.description, url: args.url },
        });
      },
      postCommentOnFeed: async (
        parent: unknown,
        args: { feedId: string; body: string },
        ctx
      ) => {
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
        return await ctx.prisma.comment
          .create({
            data: {
              body: args.body,
              feedID: parseInt(args.feedId),
              createdAt: new Date(),
            },
          })
          .catch((err: unknown) => {
            if (
              err instanceof Prisma.PrismaClientKnownRequestError &&
              err.code === "P2003"
            ) {
              return Promise.reject(
                new GraphQLError(
                  `Cannot post comment on non-existing feed with id '${args.feedId}'`
                )
              );
            }
            return Promise.reject(err);
          });
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
        return await ctx.prisma.comment.findMany({
          where: { feedID: parent.id },
          orderBy: { createdAt: "desc" },
        });
      },
    },
    Comment: {
      feed: async (parent: Comment, args: {}, ctx) => {
        return await ctx.prisma.feed.findFirst({
          where: { id: parent.feedID },
        });
      },
    },
    User: {
      bestFriend() {
        logger.info("resolved user best friend");

        return {
          id: "2",
          name: "Han Solo",
        };
      },
    },
  },
  middlewares: {
    Query: {},
    Mutation: {},
  },
});
