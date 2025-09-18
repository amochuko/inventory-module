import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { sql } from "../../../common/database/sqlConnection";
import AppError from "../../../common/error/app.error";
import { catchErrorHandler } from "../../../common/error/catchErrorHandler";
import { ErrorCodes } from "../../../common/error/error.codes";
import { NotFoundError } from "../../../common/error/not-found.error";
import { Supplier } from "../../generated-types/graphql";
import { IDAO } from "../interface/dao.interface";
import { SupplierModel } from "./model/supplier.model";
import { SupplierFilterInputArgs } from "./validation/supplier.schema";

const logger = createLogger("debug");

export type CreateSupplierArgs = Omit<
  Supplier,
  "id" | "created_at" | "updated_at" | "__typename"
>;

@Injectable()
export class SupplierDAO implements IDAO<SupplierModel> {
  async insert(args: CreateSupplierArgs): Promise<SupplierModel> {
    logger.info(SupplierDAO.name, ":insert a supplier");

    try {
      const res = await sql({
        text: `INSERT INTO inventory.suppliers (name, description, email, address, phone,state,country)
                VALUES ($1, $2, $3 , $4, $5,$6,$7)
                RETURNING *`,
        params: [
          args.name,
          args.description,
          args.email,
          args.address,
          args.phone,
          args.state,
          args.country,
        ],
      });

      const row = res.rows[0];
      return new SupplierModel(
        row.id,
        row.public_id,
        row.name,
        row.email,
        row.address,
        row.description,
        row.phone,
        row.state,
        row.country,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "insert" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async findAll(args?: SupplierFilterInputArgs): Promise<SupplierModel[]> {
    logger.info("SupplierDao.findAll: ", { args });

    try {
      const conditions: any[] = [];
      let params: any[] = [];
      let paramIndex = 1;

      let text = "SELECT * FROM inventory.suppliers ";

      if (args?.filter?.by && args?.filter.term) {
        switch (args.filter.by) {
          case "EMAIL":
            conditions.push(`email ILIKE ($${paramIndex++})`);
            params.push(`${args.filter.term}%`);
            break;

          case "NAME":
            conditions.push(`name ILIKE ($${paramIndex++})`);
            params.push(`${args.filter.term}%`);
            break;

          case "PHONE":
            conditions.push(`phone ILIKE ($${paramIndex++})`);
            params.push(`${args.filter.term}%`);
            break;
        }
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

      const res = await sql({ text, params });

      if (res.rowCount && res.rowCount === 0) {
        return [];
      }

      return res.rows.map(SupplierModel.rebuildFromPersistence);
    } catch (err: any) {
      logger.error(SupplierDAO.name, "DB error occurred", {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "findAll" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async _findById(id: string): Promise<SupplierModel> {
    logger.info("SupplierDao.findById: ", { id });

    try {
      const res = await sql({
        text: `SELECT * FROM inventory.suppliers 
            WHERE id = ($1)`,
        params: [id],
      });

      if (res.rowCount === 0) {
        throw new NotFoundError(`Supplier with id '${id}' not found.`, {
          extensions: {
            code: ErrorCodes.NOT_FOUND,
            errors: {
              entity: "Supplier",
              id,
            },
          },
        });
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

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async findById(id: string): Promise<SupplierModel> {
    logger.info("SupplierDao.findById: ", { id });

    try {
      const res = await sql({
        text: `SELECT * FROM inventory.suppliers 
            WHERE public_id = ($1)`,
        params: [id],
      });

      if (res.rowCount === 0) {
        throw new NotFoundError(`Supplier with id '${id}' not found.`, {
          extensions: {
            code: ErrorCodes.NOT_FOUND,
            errors: {
              entity: "Supplier",
              id,
            },
          },
        });
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

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async updateById(
    id: string,
    changes: Partial<SupplierModel>
  ): Promise<SupplierModel> {
    logger.info("SupplierDao.updateById: ", { id, changes });

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
        throw new AppError(`Update failed for supplier id '${id}'`, {
          extensions: {
            code: ErrorCodes.APP_ERROR,
            errors: {},
          },
        });
      }

      return res.rows[0];
    } catch (err: any) {
      logger.error(SupplierDAO.name, `Update failed for supplier id '${id}'`, {
        error: err,
        stack: err.stack,
        context: { entity: "SUPPLIER", operation: "updateById" },
      });

      throw catchErrorHandler(err, "SUPPLIER");
    }
  }

  async deleteById(id: string): Promise<boolean | null> {
    logger.info("SupplierDao.deleteById: ", { id });

    try {
      const res = await sql({
        text: `DELETE FROM inventory.suppliers s
        WHERE s.id = ($1)
        RETURNING 1`,
        params: [id],
      });

      if (!res.rowCount) {
        throw new AppError(`Delete failed for supplier id '${id}'`, {
          extensions: {
            code: ErrorCodes.APP_ERROR,
            errors: {},
          },
        });
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
