import { createModule } from "graphql-modules";
import { SupplierDAO } from "./supplier.dao";
import { SupplierRepo } from "./supplier.repo";
import { SupplierService } from "./supplier.service";
import { supplierSchema } from "./typedefs/supplier.schema";
import { supplierResolver } from "./supplier.resolver";

export const supplierModule = createModule({
  id: "supplierModule",
  dirname: __dirname,
  providers: [SupplierService, SupplierRepo, SupplierDAO],
  middlewares: {},
  typeDefs: [supplierSchema],
  resolvers: supplierResolver
});
