import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";

export type GraphQLContext = {
  prisma: PrismaClient;
  xFoo?: string | null;
  apiKey?: string | null;
  jwt?: string | unknown
};

export async function graphQLContext(
  ctx: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    prisma: new PrismaClient(),
    apiKey: ctx.request.headers.get("api-key"),
    xFoo: ctx.request.headers.get("x-foo"),
  };
}
