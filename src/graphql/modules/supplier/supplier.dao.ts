import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { handlePostgresError } from "../../../common/database/dbErrorHandler";
import { sql } from "../../../common/database/sqlConnection";
import { catchErrorHandler } from "../../../error/catchErrorHandler";
import { NotFoundError } from "../../../error/not-found.error";
import { Supplier } from "../../generated-types/graphql";
import { IDAO } from "../interface/dao.interface";
import { SupplierModule } from "./generated-types/module-types";
import { SupplierModel } from "./model/supplier.model";

const logger = createLogger("debug");

export type CreateSupplierArgs = Omit<
  Supplier,
  "id" | "created_at" | "updated_at" | "__typename"
>;

@Injectable()
export class SupplierDAO implements IDAO<SupplierModel> {
  async create(args: CreateSupplierArgs): Promise<SupplierModel> {
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

      const row = res.rows[0];
      return new SupplierModel(
        row.id,
        row.name,
        row.email,
        row.address,
        row.description,
        row.phone,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "create" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async findAll(
    args?: SupplierModule.SupplierFilterInput
  ): Promise<SupplierModel[]> {
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
        return res.rows.map(SupplierModel.rebuildFromPersistence);
      }

      return [];
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "findAll" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async findById(id: string): Promise<SupplierModel> {
    try {
      const res = await sql({
        query: `SELECT * FROM inventory.suppliers 
            WHERE id = ($1)`,
        params: [id],
      });

      if (res.rowCount === 0) {
        throw new NotFoundError({ resource: "Supplier", id });
      }

      return res.rows[0];
    } catch (err: any) {
      if (err instanceof Error) {
        throw err;
      }

      if (err.code) {
        throw handlePostgresError(err, "SUPPLIER");
      }

      throw new Error(err);
    }
  }

  async updateById(
    id: string,
    changes: Partial<SupplierModel>
  ): Promise<SupplierModel> {
  

    throw new Error("Method not implemented.");
  }

  deleteById(id: string): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }
}
