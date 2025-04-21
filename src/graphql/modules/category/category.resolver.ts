import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { getAbbrevationCodeFromName } from "../../../common/utils/helpers";
import { DateScalar } from "../../types/custom-scalar";
import { CategoryService } from "./category.service";
import { CategoryModule } from "./generated-types/module-types";

const logger = createLogger("debug");

const categories = [
  {
    abbrevCode: "RAN-MET-01",
    createdAt: new Date(),
    description: "This is the rain",
    id: "w234eweet2335",
    name: "Rain Metal 01",
    updatedAt: new Date(),
  },
];

export const categoryResolvers: CategoryModule.Resolvers = {
  Query: {
    categories: async (_, args, ctx) => {
      logger.info("resolving categories");

      return categories;
    },
  },
  Mutation: {
    createCategory: async (_, { argsObj }, ctx) => {
      logger.info("resolving create category");

      try {
        const res = await ctx.injector.get(CategoryService).create({
          ...argsObj,
          abbrevCode: getAbbrevationCodeFromName(argsObj.name),
        });

        console.log({ res });

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
        if (err instanceof GraphQLError) {
          throw err;
        }

        logger.error("Unexpected error in resolver:", err);
        // throw ErrorService.toGraphQLError(err);

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
