import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { categoryModule } from "./category/category.module";

// This is the application, it contains GraphQL schema, and its implementation
export const application = createApplication({
  modules: [categoryModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
