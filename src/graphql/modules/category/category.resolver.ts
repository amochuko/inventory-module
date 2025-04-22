import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { DateScalar } from "../../types/custom-scalar";
import { CategoryService } from "./category.service";
import { CategoryModule } from "./generated-types/module-types";

const logger = createLogger("debug");

export const categoryResolvers: CategoryModule.Resolvers = {
  Query: {
    categories: async (_, { filter }, ctx) => {
      logger.info("resolving categories with");

      return await ctx.injector.get(CategoryService).findAll({
        filterByName: filter?.filterByName,
        skip: filter?.skip,
        take: filter?.take,
      });
    },
    category: async (_, args, ctx) => {
      const res = await ctx.injector.get(CategoryService).findById(args.id);

      if (!res) {
        throw new GraphQLError(`Category with id ${args.id} not found.`, {
          extensions: {
            code: "CATEGORY_NOT_FOUND",
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
    updateCategory: async (_, { id, body }, ctx) => {
      try {
        const res = await ctx.injector
          .get(CategoryService)
          .updateById(id, body as Partial<CategoryModule.Category>);

        return {
          success: true,
          code: 200,
          message: "Successfully update",
          category: res,
        };
      } catch (err) {
        logger.error(err);
        return {
          success: false,
          code: 400,
          message: "Not successfully updated",
          category: null,
        };
      }
    },
    deleteCategory: async (_, args, ctx) => {
      logger.info(`Attempting to delete category with id: ${args.id}`);

      try {
        await ctx.injector.get(CategoryService).deleteById(args.id);

        logger.info(`Successfully deleted category with id: ${args.id}`);
        return {
          success: true,
          code: 200,
          message: "Successfully deleted",
        };
      } catch (err) {
        logger.error("Error deleting category", err);

        throw new GraphQLError(
          "An unexpected error occurred while deleting the category.",
          {
            extensions: {
              code: "DELETE_FAILED",
              categoryId: args.id,
              http: { status: 500 },
              originalError: err,
            },
          }
        );
      }
    },
  },

  Date: DateScalar,
};
