import { GraphQLError } from "graphql";
import {
  CategoryCreationError,
  CategoryNotFoundError,
  DuplicateCategoryError,
} from "../../graphql/modules/category/category.error";
import ValidationError from "../error/validation.error";

export class ErrorService {
  static toGraphQLError(err: unknown): GraphQLError {
    if (err instanceof GraphQLError) return err;

    if (err instanceof ValidationError) {
      return new GraphQLError(err.message, {
        extensions: {
          code: "VALIDATION_ERROR",
          http: {
            status: 400,
          },
        },
      });
    }

    if (err instanceof DuplicateCategoryError) {
      return new GraphQLError(err.message, {
        extensions: {
          code: "DUPLICATE_CATEGORY",
          http: {
            status: 409,
          },
        },
      });
    }

    if (err instanceof CategoryNotFoundError) {
      return new GraphQLError(err.message, {
        extensions: {
          code: "CATEGORY_NOT_FOUND",
          http: {
            status: 404,
          },
        },
      });
    }
    if (err instanceof CategoryCreationError) {
      return new GraphQLError(err.message, {
        extensions: {
          code: "CATEGORY_CREATION_ERROR",
          http: {
            status: 400,
          },
        },
      });
    }

    console.error("Unhandled Error ->", err);

    return new GraphQLError("Internal Server Error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
        http: { status: 500 },
      },
    });
  }
}
