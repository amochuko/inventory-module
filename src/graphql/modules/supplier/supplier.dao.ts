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
  async insert(args: CreateSupplierArgs): Promise<SupplierModel> {
    logger.info(SupplierDAO.name, ": creating a supplier");

    try {
      const res = await sql({
        text: `INSERT INTO inventory.suppliers (name, description, email, address, phone)
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

      let text = "SELECT * FROM inventory.suppliers ";

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
        text += `WHERE ${conditions.join(" OR ")} `;
      }

      text += `ORDER BY id ASC `;

      if (args?.filter?.skip) {
        text += `OFFSET ($${paramIndex++}) `;
        params.push(args.filter.skip);
      }
      if (args?.filter?.take) {
        text += `LIMIT ($${paramIndex++}) `;
        params.push(args.filter.take);
      }

      logger.info("findAll: ", { text, params });

      const res = await sql({ text, params });

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
        text: `SELECT * FROM inventory.suppliers 
            WHERE id = ($1)`,
        params: [id],
      });

      if (res.rowCount === 0) {
        throw new NotFoundError({ resource: "Supplier", id });
      }

      return res.rows[0];
    } catch (err: any) {
      logger.error(
        SupplierDAO.name,
        `findById failed for supplier id '${id}'`,
        {
          error: err,
          stack: err.stack,
          context: { entity: "SUPPLIER", operation: "findById" },
        }
      );
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
    logger.info("Supplier.updateById: ", { id, changes });

    const sets: string[] = [];
    const params: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(changes)) {
      sets.push(`${key} = ($${index++})`);
      params.push(value);
    }

    const text = `UPDATE inventory.suppliers SET ${sets.join(
      ", "
    )} WHERE id = ($${index})
    RETURNING *`.trim();

    try {
      const supplier = await this.findById(id);
      params.push(supplier.id);

      const res = await sql({ text, params });

      if (!res.rowCount) {
        throw new Error(`Update failed for supplier id '${id}'`);
      }

      return res.rows[0];
    } catch (err: any) {
      logger.error(SupplierDAO.name, `Update failed for supplier id '${id}'`, {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "updateById" },
      });

      if (err instanceof Error) {
        throw err;
      }

      if (err.code) {
        throw handlePostgresError(err, "SUPPLIER");
      }

      throw new Error(err);
    }
  }

  async deleteById(id: string): Promise<boolean | null> {
    try {
      const res = await sql({
        text: `DELETE FROM inventory.suppliers s
        WHERE s.id = ($1)
        RETURNING 1`,
        params: [id],
      });

      if (!res.rowCount) {
        throw new Error(`Delete failed for supplier id '${id}'`);
      }

      return res.rowCount > 0;
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "findAll" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }
}
