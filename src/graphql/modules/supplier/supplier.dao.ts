import { Injectable } from "graphql-modules";
import { sql } from "../../../config/database/sqlConnection";
import AppError, { ErrorCodes } from "../../../error/app.error";
import { Supplier } from "../../generated-types/graphql";
import { DAO, filterOptions } from "../interface/dao.interface";

export type CreateSupplierArgs = Omit<
  Supplier,
  "id" | "created_at" | "updated_at" | "__typename"
>;

@Injectable()
export class SupplierDAO implements DAO<Supplier> {
  async create(args: CreateSupplierArgs): Promise<Supplier> {
    try {
      const res = await sql({
        query: `INSERT INTO inventory.suppliers (name, description, email, address, phone)
                VALUES ($1, $2, $3 , $4, $5)
                RETURNING *`,
        params: [
          args.name,
          args.description,
          args.email,
          args.address,
          args.phone,
        ],
      });

      if (!res.rowCount) {
        throw new AppError(
          ErrorCodes.CREATION_FAILED,
          {
            ENTITY: "SUPPLIER",
            categoryId: "234",
          },
          "Supplier not created!"
        );
      }

      return res.rows[0];
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        switch (err.code) {
          case ErrorCodes.CREATION_FAILED:
            throw "Failed to creaeted.";

          default:
            throw "Unknow error occured";
        }
      }
      throw new Error("Error creating Supplier");
    }
  }
  
  findAll(args?: filterOptions): Promise<Supplier[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Supplier> {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, body: Partial<Supplier>): Promise<Supplier> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<Supplier | null> {
    throw new Error("Method not implemented.");
  }
}
