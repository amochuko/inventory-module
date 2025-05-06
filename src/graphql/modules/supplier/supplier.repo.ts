import { Injectable } from "graphql-modules";
import { DatabaseError } from "../../../error/database.error";
import { IDAO } from "../interface/dao.interface";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";
import { SupplierDAO } from "./supplier.dao";

@Injectable()
export class SupplierRepo implements IDAO<SupplierModel> {
  constructor(private dao: SupplierDAO) {}

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<SupplierModel[]> {
    const entities = await this.dao.findAll(args);

    return entities.map(
      (e) =>
        new SupplierModel(
          e.id,
          e.name,
          e.email,
          e.address,
          e.description,
          e.phone,
          e.created_at,
          null
        )
    );
  }

  async findById(id: string): Promise<SupplierModel> {
    const row = await this.dao.findById(id);

    return SupplierModel.rebuildFromPersistence(row);
  }

  async updateById(
    id: string,
    supplier: Partial<SupplierModel>
  ): Promise<SupplierModel> {
    return await this.dao.updateById(id, supplier);
  }

  async save(supplier: SupplierModel): Promise<SupplierModel> {
    const data = supplier.toPersistence();

    if (!supplier.id) {
      const created = await this.dao.insert(data);

      if (!created) {
        throw new DatabaseError("Failed to add new supplier");
      }

      return SupplierModel.rebuildFromPersistence(created);
    } else {
      // update existing supplier
      const updated = await this.dao.updateById(supplier.id, data);

      if (!updated) {
        throw new DatabaseError(
          `Failed to updated supplier with ID: ${supplier.id}`
        );
      }

      return SupplierModel.rebuildFromPersistence(updated);
    }
  }

  async deleteById(id: string): Promise<boolean | null> {
    return await this.dao.deleteById(id);
  }
}
