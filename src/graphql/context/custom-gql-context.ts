import { YogaInitialContext } from "graphql-yoga";
import ProductDAO from "../modules/product/product.dao";
import { ProductService } from "../modules/product/product.service";

export interface CustomGQLContext extends GraphQLModules.ModuleContext {
  foo: string | null;
  productService: ProductService;
}

export async function createContext(
  ctx: YogaInitialContext
): Promise<Partial<CustomGQLContext>> {
  return {
    foo: ctx.request.headers.get("x-foo") ?? null,
    productService: new ProductService(new ProductDAO()),
  };
}
