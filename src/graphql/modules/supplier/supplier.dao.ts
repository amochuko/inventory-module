import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { handlePostgresError } from "../../../common/database/dbErrorHandler";
import { sql } from "../../../common/database/sqlConnection";
import { Supplier } from "../../generated-types/graphql";
import { DAO } from "../interface/dao.interface";
import { SupplierModule } from "./generated-types/module-types";

const logger = createLogger("debug");

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

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<Supplier[]> {
    try {
      const conditions: any[] = [];
      let params: any[] = [];
      let paramIndex = 1;

      let query = "SELECT * FROM inventory.suppliers ";

      if (args?.filter?.by && args?.filter?.by === "EMAIL") {
        conditions.push(`email ILIKE ($${paramIndex++})`);
        params.push(`${args.filter.term}%`);
      }

      if (args?.filter?.by && args?.filter?.by === "NAME") {
        conditions.push(`name ILIKE ($${paramIndex++})`);
        params.push(`${args.filter.term}%`);
      }

      if (args?.filter?.by && args?.filter?.by === "PHONE") {
        conditions.push(`phone ILIKE ($${paramIndex++})`);
        params.push(`${args.filter.term}%`);
      }

      if (conditions.length > 0) {
        query += `WHERE ${conditions.join(" OR ")} `;
      }

      query += `ORDER BY id ASC `;

      if (args?.filter?.skip) {
        query += `OFFSET ($${paramIndex++}) `;
        params.push(args.filter.skip);
      }
      if (args?.filter?.take) {
        query += `LIMIT ($${paramIndex++}) `;
        params.push(args.filter.take);
      }

      logger.info("findAll: ", { query, params });
      
      const res = await sql({ query, params });

      if (res.rowCount && res.rowCount > 0) {
        return res.rows;
      }
      return [];
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "findAll" },
      });

      throw handlePostgresError(err, "SUPPLIER");
    }
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
