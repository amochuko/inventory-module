import { Injectable } from "graphql-modules";
import { DatabaseError } from "../../../common/error/database.error";
import { IDAO } from "../interface/dao.interface";
import { SupplierModel } from "./model/supplier.model";
import { SupplierDAO } from "./supplier.dao";
import { SupplierFilterInputArgs } from "./validation/supplier.schema";

@Injectable()
export class SupplierRepo implements IDAO<SupplierModel> {
  constructor(private dao: SupplierDAO) {}

  async findAll(args?: SupplierFilterInputArgs): Promise<SupplierModel[]> {
    const entities = await this.dao.findAll(args);

    return entities.map(
      (e) =>
        new SupplierModel(
          '',
          e.public_id,
          e.name,
          e.email,
          e.address,
          e.description,
          e.phone,
          e.state,
          e.country,
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
    const result = await this.dao.updateById(id, supplier);
    return SupplierModel.rebuildFromPersistence(result);
  }

  async insert(supplier: SupplierModel): Promise<SupplierModel> {
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
