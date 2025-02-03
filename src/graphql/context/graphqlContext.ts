import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";
import { FeedService } from "../modules/feed/feed.service";

/**
 * This the custom `GraphQLContext` used
 * for in the resolvers of
 */
export interface GraphQLContext
  extends YogaInitialContext,
    GraphQLModules.GlobalContext {
  readonly feedService: FeedService;
  readonly apiKey?: string | null;
  readonly jwt?: string | null;
}

/**
 * This function accepts as param `YogaInitialContext`
 * and returns the update `Context`
 * @param ctx YogaInitialContext
 * @returns Promise<GraphQLContext>
 */
export async function graphQLContext(ctx: YogaInitialContext) {
  return {
    feedService: new FeedService(new PrismaClient()),
    apiKey: ctx.request.headers.get("api-key"),
    ...ctx,
  };
}
