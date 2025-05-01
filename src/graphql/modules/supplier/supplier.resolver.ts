import { createLogger } from "graphql-yoga";
import AppError from "../../../error/app.error";
import { DateScalar } from "../../types/custom-scalar";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierService } from "./supplier.service";

const logger = createLogger("debug");

export const supplierResolver: SupplierModule.Resolvers = {
  Query: {
    suppliers: async (_, args, ctx) => {
      return await ctx.injector
        .get(SupplierService)
        .findAll(args.s_filter_input!);
    },
    supplier: async (_, args, ctx) => {
      return await ctx.injector.get(SupplierService).findById(args.id);
    },
  },
  Mutation: {

  },
  Date: DateScalar,
};
