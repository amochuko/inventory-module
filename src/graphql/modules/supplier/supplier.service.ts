import { Injectable } from "graphql-modules";
import ValidationError from "../../../error/validation.error";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";
import { CreateSupplierArgs } from "./supplier.dao";
import { SupplierRepo } from "./supplier.repo";
import { CreateSupplierSchema } from "./validation/supplier.schema";

@Injectable()
export class SupplierService {
  constructor(private repo: SupplierRepo) {}

  async save(args: CreateSupplierArgs): Promise<SupplierModel> {
    // Validate the incoming DTO before model creation
    const validated = CreateSupplierSchema.safeParse(args);
    if (!validated.success) {
      throw new ValidationError(
        `Validation failed: ${validated.error.message}`
      );
    }

    const model = SupplierModel.createFromDTO(validated.data);
    return await this.repo.save(model);
  }

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<SupplierModel[]> {
    return await this.repo.findAll(args);
  }

  async findById(id: string): Promise<SupplierModel> {
    return await this.repo.findById(id);
  }

  async updateEmail(id: string, newEmail: string): Promise<SupplierModel> {
    const supplier = await this.findById(id); // fetch domain object
    supplier.updateEmail(newEmail); // Business logic

    const updated = await this.repo.save(supplier); // Persist changes
    return updated;
  }

  async updateById(
    id: string,
    changes: Partial<SupplierModel>
  ): Promise<SupplierModel> {
    const supplier = await this.repo.findById(id);

    const newUpdate = {
      ...supplier.toPersistence(),
      ...changes,
    };

    return await this.repo.updateById(supplier.id, newUpdate);
  }

  async deleteById(id: string): Promise<boolean | null> {
    return await this.repo.deleteById(id);
  }
}
