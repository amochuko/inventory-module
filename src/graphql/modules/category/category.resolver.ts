import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { DateScalar } from "../../types/custom-scalar";
import { CategoryService } from "./category.service";
import { CategoryModule } from "./generated-types/module-types";

const logger = createLogger("debug");

export const categoryResolvers: CategoryModule.Resolvers = {
  Query: {
    categories: async (_, args, ctx) => {
      logger.info("resolving categories");
     
    },
  },
  Mutation: {
    createCategory: async (_, { argsObj }, ctx) => {
      logger.info("resolving create category");

      try {
        const res = await ctx.injector.get(CategoryService).create(argsObj);

        if (!res) {
          throw new GraphQLError(res, {
            extensions: {
              code: "CATEGORY_NOT_CREATED",
              http: {
                status: 400,
              },
            },
          });
        }

        return {
          success: true,
          code: 200,
          message: "Successfully added",
          category: res,
        };
      } catch (err) {
        logger.error("Unexpected error in resolver:", err);
        return {
          success: false,
          code: 400,
          message: `${err}`,
          category: null,
        };
      }
    },
  },

  Date: DateScalar,
};
