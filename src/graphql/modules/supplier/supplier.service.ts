import { Injectable } from "graphql-modules";
import { IDAO } from "../interface/dao.interface";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";
import { CreateSupplierArgs } from "./supplier.dao";
import { SupplierRepo } from "./supplier.repo";

@Injectable()
export class SupplierService implements IDAO<SupplierModel> {
  constructor(private repo: SupplierRepo) {}

  async insert(args: CreateSupplierArgs): Promise<SupplierModel> {
    const supplier = SupplierModel.createFromDTO(args);

    return await this.repo.save(supplier);
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
      ...supplier,
      ...changes,
    };

    return await this.repo.updateById(supplier.id, newUpdate);
  }

  async deleteById(id: string): Promise<boolean | null> {
    return await this.repo.deleteById(id);
  }
}
