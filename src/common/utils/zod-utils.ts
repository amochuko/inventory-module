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
  const result = args.schema.safeParse(args.input);
  const logger = createLogger("debug");

  if (!result.success) {
    const validationErrors = result.error.format();

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
