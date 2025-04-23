import { createModule } from "graphql-modules";
import { supplierSchema } from "./typedefs/supplier.schema";

export const supplierModule = createModule({
  id: "supplierModule",
  dirname: __dirname,
  providers: [],
  middlewares: {},
  typeDefs: [supplierSchema],
});
