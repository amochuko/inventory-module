import { createModule } from "graphql-modules";
import ProductDAO from "./product.dao";
import { productResolvers } from "./product.resolver";
import { ProductService } from "./product.service";
import { productSchema } from "./typedefs/product.schema";

export const productModule = createModule({
  id: "productModule",
  dirname: __dirname,
  providers: [ProductService, ProductDAO],
  middlewares: {},
  typeDefs: [productSchema],
  resolvers: productResolvers,
});
