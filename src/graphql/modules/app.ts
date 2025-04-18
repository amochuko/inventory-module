import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { userModule } from "./user/user.module";
import { feedModule } from "./feed/feed.module";

// This is the application, it contains GraphQL schema, and its implementation
export const application = createApplication({
  modules: [userModule, feedModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
