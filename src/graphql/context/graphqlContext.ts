import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";

export type GraphQLContext = {
  prisma: PrismaClient;
  apiKey?: string | null;
  jwt?: string | null
};

export async function graphQLContext(
  ctx: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    prisma: new PrismaClient(),
    apiKey: ctx.request.headers.get("api-key"),
  };
}
