import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { parseIntSafe } from "../../../common/utils/helpers";
import { DateScalar } from "../types/scalar";
import { FeedService } from "./feed.service";
import { FeedModule } from "./generated-types/module-types";

const logger = createLogger("debug");

const links: FeedModule.Link[] = [
  {
    feed_id: "1010",
    url: "https://example.com",
    description:
      "GraphQL Code Generator is a plugin-based tool that helps you get the best out of your GraphQL stack. From back-end to front-end, GraphQL Code.",
    comments: [],
    created_at: new Date(),
  },
  {
    feed_id: "1012",
    description: "Generator automates the generation of the hello links",
    url: "https://example.com",
    comments: [],
    created_at: new Date(),
  },
];

const date = new Date().toUTCString().toString();

const comments: FeedModule.Comment[] = [
  {
    id: "1234",
    body: "String of the body hello",
    link: links[0],
    created_at: date,
  },
  {
    id: "4567",
    body: "hello",
    link: links[1],
    created_at: date,
  },
];

export const feedResolvers: FeedModule.Resolvers = {
  Query: {
    feed: async (_, args, ctx) => {
      logger.info("resolving feed");

      // const take = applyTakeConstraints({
      //   min: 1,
      //   max: 50,
      //   value: parseInt(String(args.take)) ?? 30,
      // });

      const feeds = await ctx.injector.get(FeedService).getAll();
      return feeds;
    },
    link: async (_, args, ctx) => {
      const res = await ctx.feedAPI.getById(args.id);

      if (!res) {
        throw new GraphQLError(`Link with id ${args.id} not found.`, {
          extensions: {
            code: "LINK_NOT_FOUND",
            linkId: args.id,
            http: {
              status: 400,
            },
          },
        });
      }

      return res;
    },
    comment: async (_, args, ctx) => {
      return comments[0];
    },
  },
  Mutation: {
    postLink: async (_, args, ctx) => {
      // vaildate input data

      const res = await ctx.injector
        .get(FeedService)
        .create({ url: args.url, description: args.description });

      return res;
    },
    updateLink: async (_, args, ctx) => {
      // vaildate input data

      try {
        const res = await ctx.injector
          .get(FeedService)
          .updateById(args.id, args.link);


        if (!res?.feed_id) {
          throw new GraphQLError(`Link with id ${args.id} not found.`, {
            extensions: {
              code: "LINK_NOT_FOUND",
              linkId: args.id,
              http: {
                status: 400,
              },
            },
          });
        }

        return {
          code: "200",
          message: "Successful update!",
          success: true,
          link: res,
        };
      } catch (err) {
        console.error(err);

        return {
          code: "201",
          message: `Unsuccessful update ${err}`,
          success: false,
          link: null,
        };
      }
    },
    postCommentOnLink: async (_, args, ctx) => {
      const linkId = parseIntSafe(args.linkId);

      if (linkId === null) {
        return Promise.reject(
          new GraphQLError(
            `Cannot post comment on non-existing link with id '${args.linkId}'.`
          )
        );
      }

      const link = links.find((lk) => lk.feed_id === args.linkId);
      const comment: FeedModule.Comment = {
        body: String(args.body),
        link: link!,
        created_at: date,
        id: "",
      };

      const { id, ...others } = comment;
      comments.push(comment);

      return {
        code: "200",
        comment: comment,
        message: "post successful",
        success: true,
      };
    },
  },
  Link: {
    feed_id: (parent) => parent.feed_id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    created_at: (parent) => parent.created_at,
    comments: (parent, args, ctx) => {
      return comments;
    },
  },
  Date: DateScalar,
};
