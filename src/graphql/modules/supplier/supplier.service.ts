import { Injectable } from "graphql-modules";
import { ErrorCodes } from "../../../common/error/error.codes";
import { validateOrThrow } from "../../../common/utils/zod-utils";
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

@Injectable()
export class SupplierService {
  constructor(private repo: SupplierRepo) {}

  async save(args: SupplierCreateArgs): Promise<SupplierModel> {
    // Validate the incoming DTO before model creation
    const validated = validateOrThrow({
      schema: SupplierCreateSchema,
      input: args,
      errorMsg: "Validation failed for SupplierCreateArgs",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    const model = SupplierModel.createFromDTO(validated);
    return await this.repo.insert(model);
  }

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<SupplierModel[]> {
    const validated = validateOrThrow({
      schema: SupplierFilterSchema,
      input: args,
      errorMsg: "Validation failed for findAll args",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    return await this.repo.findAll(validated);
  }

  async findById(id: string): Promise<SupplierModel> {
    id = this._validateId(id);

    return await this.repo.findById(id);
  }

  async updateEmail(args: SupplierUpdateEmailArgs): Promise<SupplierModel> {
    const validated = validateOrThrow({
      schema: SupplierUpdateEmailSchema,
      input: args,
      errorMsg: "Validation failed for updateEmail args",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    const supplier = await this.findById(validated.id); // fetch domain object
    supplier.updateEmail(validated.newEmail); // Business logic

    const updated = await this.repo.insert(supplier); // Persist changes
    return updated;
  }

  async update(
    id: string,
    changes: Partial<SupplierModel>
  ): Promise<SupplierModel> {
    id = this._validateId(id);

    const validated = validateOrThrow({
      schema: SupplierUpdateSchema,
      input: { id, changes },
      errorMsg: "Validation failed for update args",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    const supplier = await this.repo.findById(id);
    supplier.mergeUpdate(validated);

    const newUpdate = {
      ...supplier.toPersistence(),
      ...validated,
    };

    return await this.repo.updateById(supplier.id, newUpdate);
  }

  async deleteById(id: string): Promise<boolean | null> {
    id = this._validateId(id);

    return await this.repo.deleteById(id);
  }

  private _validateId(id: string) {
    const validated = validateOrThrow({
      schema: SupplierIdSchema,
      input: id,
      errorMsg: "Validation failed for id as valid UUID",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    return validated;
  }
}
