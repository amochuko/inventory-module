import { GraphQLError } from "graphql";
import { createLogger } from "graphql-yoga";
import { ZodSchema } from "zod";
import { ErrorCodes } from "../error/error.codes";

type ValidateOrThrowType<T> = {
  schema: ZodSchema<T>;
  input: unknown;
  errorMsg: string;
  errorCode: ErrorCodes;
};
export function validateOrThrow<T>(args: ValidateOrThrowType<T>): T {
  const logger = createLogger("debug");

  const result = args.schema.safeParse(args.input);

  if (!result.success) {
    const validationErrors = result.error.flatten();

    logger.warn(args.errorMsg, validationErrors);

    throw new GraphQLError(args.errorMsg, {
      extensions: {
        errors: validationErrors,
        code: args.errorCode,
      },
    });
  }

  return result.data;
}
