import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";
import { categoryModule } from "./category/category.module";
import { productModule } from "./product/product.module";
import { supplierModule } from "./supplier/suppiler.module";

// This is the application, it contains GraphQL schema, and its implementation
export const application = createApplication({
  modules: [categoryModule, productModule, supplierModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
