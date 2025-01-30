import { cacheControlDirective } from "@graphql-yoga/plugin-response-cache";
import { Comment, Feed, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { createLogger, createSchema } from "graphql-yoga";
import { setTimeout as setTimeout$ } from "node:timers/promises";

export const logger = createLogger("debug");

const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10);
  }

  return null;
};

const typeDefs = /* GraphQL */ `
  # Setting uo cache for schema element
  ${cacheControlDirective}

  "The query type, represents all of the entry points into our object graph"
  type Query {
    # Getting a cookie
    cookie(name: String): String

    "Info is of a String scalar"
    info: String!

    "This is the Feed to different websites"
    feed(filterNeedle: String, skip: Int, take: Int): [Feed!]!

    "The comment for a feed"
    comment(id: ID!): Comment

    "Fetches the hero of a specified Star Wars film"
    hero(
      "The name of the film that the hero appears in"
      episode: Episode
    ): Character

    "User type"
    user: User

    "Testing Response Cache"
    slow: String
  }

  """
  The mutation is take state changing function of the schema
  """
  type Mutation {
    # setting a cookie
    setCookie(name: String, value: String): String

    "This is the function called to create a new feed"
    postFeed(
      "The url of the feed"
      url: String!
      "The description of the feed"
      description: String!
    ): Feed!

    "This add comment of a Feed"
    postCommentOnFeed(feedId: ID!, body: String): Comment!
  }

  "An interface that describes the Node"
  interface Node {
    "A unique identifier of the node"
    id: ID!
  }

  """
  An interface that describes dates
  """
  interface Dates {
    createdAt: String
    updatedAt: String
  }

  """
  A character from the Star Wars universe
  """
  type Character implements Node {
    "The id of the character."
    id: ID!
    "The name of the character."
    name: String!
    "The age of the character"
    age: Int!
    "The episode featured on"
    episode: Episode
    createdAt: String
    updatedAt: String
  }

  """
  The episodes in the Stars Wars trilogy
  """
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }

  "The  comment type"
  type Comment implements Node {
    id: ID!
    createdAt: String
    updatedAt: String
    body: String
    feed: Feed!
  }

  "This the Feed object"
  type Feed implements Node {
    "The identifier of the Feed"
    id: ID!
    "The description of the Feed"
    description: String!
    "The url of the Feed"
    url: String!
    "The comments of a Feed"
    comments: [Comment!]!
    createdAt: String
    updatedAt: String
  }

  # cache query operations containing 'User' for 10 seconds
  type User @cacheControl(maxAge: 10000) {
    id: ID!
    name: String
    bestFriend: User
  }

  type Subscription {
    countdown(from: Int!): Int
  }
`;

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

export const schema = createSchema({
  typeDefs: [typeDefs],
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
      info: async (_, args, ctx, info) => {
        console.log(ctx.jwt)
        return `Hello World of Information Logic!`;
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
});
