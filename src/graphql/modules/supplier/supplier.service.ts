import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";
import { ErrorCodes } from "../../../error/error.codes";
import ValidationError from "../../../error/validation.error";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";
import { SupplierRepo } from "./supplier.repo";
import {
  SupplierCreateArgs,
  SupplierCreateSchema,
  SupplierFilterSchema,
  SupplierIdSchema,
  SupplierUpdateEmailArgs,
  SupplierUpdateEmailSchema,
  SupplierUpdateSchema,
} from "./validation/supplier.schema";

const logger = createLogger("debug");

@Injectable()
export class SupplierService {
  constructor(private repo: SupplierRepo) {}

  async save(args: SupplierCreateArgs): Promise<SupplierModel> {
    // Validate the incoming DTO before model creation
    const validated = SupplierCreateSchema.safeParse(args);
    if (!validated.success) {
      const validationErrors = validated.error.format();

      logger.warn("Validation failed for SupplierCreateArgs", validationErrors);

      throw new ValidationError(`Validation failed`, {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    const model = SupplierModel.createFromDTO(validated.data);
    return await this.repo.insert(model);
  }

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<SupplierModel[]> {
    const validation = SupplierFilterSchema.safeParse(args);

    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn("Validation failed for findAll args", validationErrors);

      throw new ValidationError("Invalid filter args", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    return await this.repo.findAll(validation.data);
  }

  async findById(id: string): Promise<SupplierModel> {
    this._validateId(id);

    return await this.repo.findById(id);
  }

  async updateEmail(args: SupplierUpdateEmailArgs): Promise<SupplierModel> {
    const validation = SupplierUpdateEmailSchema.safeParse(args);

    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn("Validation failed for updateEmail args", validationErrors);

      throw new ValidationError("Invalid args", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    const supplier = await this.findById(validation.data.id); // fetch domain object
    supplier.updateEmail(validation.data.newEmail); // Business logic

    const updated = await this.repo.insert(supplier); // Persist changes
    return updated;
  }

  async update(
    id: string,
    changes: Partial<SupplierModel>
  ): Promise<SupplierModel> {
    const validation = SupplierUpdateSchema.safeParse(changes);
    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn("Validation failed for updateById args", validationErrors);

      throw new ValidationError("Invalid args", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    const supplier = await this.repo.findById(id);
    supplier.mergeUpdate(validation.data);

    const newUpdate = {
      ...supplier.toPersistence(),
      ...validation.data,
    };

    return await this.repo.updateById(supplier.id, newUpdate);
  }

  async deleteById(id: string): Promise<boolean | null> {
    this._validateId(id);

    return await this.repo.deleteById(id);
  }

  private _validateId(id: string) {
    const validation = SupplierIdSchema.safeParse(id);

    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn("Validation failed for findById args", validationErrors);

      throw new ValidationError("Invalid UUID", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }
  }
}
