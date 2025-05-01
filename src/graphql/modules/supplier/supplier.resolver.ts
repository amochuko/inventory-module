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
    createSupplier: async (_, { s_input }, ctx) => {
      logger.info("Resolving create supplier.");
      try {
        const result = await ctx.injector.get(SupplierService).insert(s_input);

        return {
          code: 200,
          message: "Successfully created Supplier",
          success: true,
          supplier: result,
        };
      } catch (err: any) {
        logger.error("Supplier creation failed", err);

        const isAppError = err instanceof AppError;

        return {
          code: 400,
          message: isAppError
            ? err.message
            : "Unexpected error while creating supplier.",
          success: false,
          supplier: null,
        };
      }
    },
  },
  Date: DateScalar,
};
