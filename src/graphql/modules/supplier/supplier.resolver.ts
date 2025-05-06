import { createLogger } from "graphql-yoga";
import AppError from "../../../common/error/app.error";
import { DateScalar } from "../../types/custom-scalar";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";
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
        const result = await ctx.injector.get(SupplierService).save(s_input);

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
    updateSupplier: async (_, args, ctx) => {
      try {
        const res = await ctx.injector
          .get(SupplierService)
          .update(
            args.s_input.id,
            args.s_input.update_input as Partial<SupplierModel>
          );

        return {
          code: 200,
          message: `Successfully updated Supplier with id '${args.s_input.id}'`,
          success: true,
          supplier: res,
        };
      } catch (err) {
        logger.error("Supplier deleteion failed", err);

        const isAppError = err instanceof AppError;

        return {
          code: 400,
          message: isAppError
            ? err.message
            : "Unexpected error while attempting to update supplier.",
          success: false,
          supplier: null,
        };
      }
    },
    deleteSupplier: async (_, args, ctx) => {
      try {
        await ctx.injector.get(SupplierService).deleteById(args.id);

        return {
          code: 200,
          message: `Successfully deleted Supplier with id '${args.id}'`,
          success: true,
          supplier: null,
        };
      } catch (err) {
        logger.error("Supplier deleteion failed", err);

        const isAppError = err instanceof AppError;

        return {
          code: 400,
          message: isAppError
            ? err.message
            : "Unexpected error while attempting to delete supplier.",
          success: false,
          supplier: null,
        };
      }
    },
  },
  Date: DateScalar,
};
