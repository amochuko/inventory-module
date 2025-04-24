import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { handlePostgresError } from "../../../common/database/dbErrorHandler";
import { sql } from "../../../common/database/sqlConnection";
import { Supplier } from "../../generated-types/graphql";
import { DAO, filterOptions } from "../interface/dao.interface";

const logger = createLogger("error");

export type CreateSupplierArgs = Omit<
  Supplier,
  "id" | "created_at" | "updated_at" | "__typename"
>;

@Injectable()
export class SupplierDAO implements DAO<Supplier> {
  async create(args: CreateSupplierArgs): Promise<Supplier> {
    logger.info(SupplierDAO.name, ": creating a supplier");

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

      return res.rows[0];
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "create" },
      });

      throw handlePostgresError(err, "SUPPLIER");
    }
  }

  async findAll(args?: filterOptions): Promise<Supplier[]> {
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
