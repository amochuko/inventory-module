import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { DateScalar } from "../../types/custom-scalar";
import { ProductModule } from "./generated-types/module-types";
import { ProductService } from "./product.service";

const logger = createLogger("debug");

export const productResolvers: ProductModule.Resolvers = {
  Query: {
    products: async (_, args, ctx) => {
      logger.info("resolving product");

      // const take = applyTakeConstraints({
      //   min: 1,
      //   max: 50,
      //   value: parseInt(String(args.take)) ?? 30,
      // });

      const products = await ctx.injector.get(ProductService).getAll();
      return products;
    },
    product: async (_, args, ctx) => {
      const res = await ctx.productService.getById(args.id);

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
  },
  Mutation: {
    createProduct: async (_, args, ctx) => {
      // vaildate input data
      const res = await ctx.injector.get(ProductService).create(args.inputs);

      return res;
    },
    updateProduct: async (_, { inputs }, ctx) => {
      // vaildate input data

      try {
        const res = await ctx.injector
          .get(ProductService)
          .updateById(inputs.id, inputs.product);

        if (!res?.id) {
          throw new GraphQLError(`Product with id ${inputs.id} not found.`, {
            extensions: {
              code: "PRODUCT_NOT_FOUND",
              linkId: inputs.id,
              http: {
                status: 400,
              },
            },
          });
        }

        return {
          code: 200,
          message: "Successful update!",
          success: true,
          product: res,
        };
      } catch (err) {
        console.error(err);

        return {
          code: 201,
          message: `Unsuccessful update ${err}`,
          success: false,
          link: null,
        };
      }
    },
    // postCommentOnLink: async (_, args, ctx) => {
    //   const linkId = parseIntSafe(args.);

    //   if (linkId === null) {
    //     return Promise.reject(
    //       new GraphQLError(
    //         `Cannot post comment on non-existing link with id '${args.linkId}'.`
    //       )
    //     );
    //   }

    //   return {
    //     code: 200,
    //     comment: comment,
    //     message: "post successful",
    //     success: true,
    //   };
    // },
  },
  // Link: {
  //   product_id: (parent) => parent.product_id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  //   created_at: (parent) => parent.created_at,
  //   comments: (parent, args, ctx) => {
  //     return comments;
  //   },
  // },
  Date: DateScalar,
};
