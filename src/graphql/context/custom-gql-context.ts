import { YogaInitialContext } from "graphql-yoga";
import FeedDao from "../modules/feed/feed.dao";
import { FeedService } from "../modules/feed/feed.service";

export interface CustomGQLContext extends GraphQLModules.ModuleContext {
  foo: string | null;
  feedAPI: FeedService;
}

export async function createContext(
  ctx: YogaInitialContext
): Promise<Partial<CustomGQLContext>> {
  return {
    foo: ctx.request.headers.get("x-foo") ?? null,
    feedAPI: new FeedService(new FeedDao),
  };
}
