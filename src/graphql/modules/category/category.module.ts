import { createModule } from "graphql-modules";
import CategoryDAO from "./category.dao";
import { CategoryRepository } from "./category.repo";
import { categoryResolvers } from "./category.resolver";
import { CategoryService } from "./category.service";
import { categorySchema } from "./typedefs/category.schema";

export const categoryModule = createModule({
  id: "categoryModule",
  dirname: __dirname,
  providers: [CategoryService, CategoryDAO, CategoryRepository],
  middlewares: {},
  typeDefs: [categorySchema],
  resolvers: categoryResolvers,
});
