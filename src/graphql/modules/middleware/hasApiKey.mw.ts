import { GraphQLError } from "graphql";
import { MiddlewareContext } from "graphql-modules";

export const hasApiKey = async (
  obj: MiddlewareContext,
  next: () => Promise<unknown>
) => {
  if (!obj.context.apiKey) {
    throw new GraphQLError("No API key attached to request!");
  }

  // TODO: checkmate the validity of the API
  // key before return

  return next();
};
