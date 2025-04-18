import { GraphQLError } from "graphql";
import { MiddlewareContext } from "graphql-modules";
import { AuthService } from "../../common/services/auth.service";

export async function notAuthorizedMW(
  { root, args, context, info }: MiddlewareContext,
  next: Function
) {
  const isloggedIn = await context.injector.get(AuthService).isLoggedIn();

  if (!isloggedIn) {
    throw new GraphQLError("Not Authorized", {
      extensions: {
        code: "NOT_AUTHORIZED",
        http: {
          status: 502,
          headers: {},
        },
      },
    });
  }

  return next();
}
