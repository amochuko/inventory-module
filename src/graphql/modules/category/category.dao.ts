import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { sql } from "../../../common/database/sqlConnection";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import {
  CategoryCreationError,
  CategoryFindAllError,
  CategoryNotFoundError,
} from "./category.error";
import { ICategory } from "./category.interface";

const logger = createLogger("error");

@Injectable()
export default class CategoryDAO implements ICategory {
  //
  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    try {
      const conditions: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      if (args?.filterByName) {
        conditions.push(`name ILIKE ($${paramIndex++})`);
        params.push(`${args.filterByName}%`);
      }

      let query = `SELECT * FROM inventory.categories`;

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }

      query += ` ORDER BY id ASC`;

      if (args?.take) {
        query += ` LIMIT ($${paramIndex++})`;
        params.push(args.take);
      }

      if (args?.skip) {
        query += ` OFFSET ($${paramIndex++})`;
        params.push(args.skip);
      }

      const res = await sql({ query, params });

      return res.rows;
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new CategoryFindAllError();
    }
  }

  async findById(id: string): Promise<Category> {
    try {
      const result = await sql({
        query: `SELECT * FROM inventory.categories
        WHERE id = ($1)`,
        params: [id],
      });

      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new CategoryNotFoundError();
    }
  }

  async updateById(id: string, body: Partial<Category>): Promise<Category> {
    try {
      const keys = Object.keys(body) as (keyof typeof body)[];

      const setClause = keys.map((k, i) => `${k} = ($${i + 1})`).join(", ");

      const values = keys.map((k) => body[k]);

      const result = await sql({
        query: `UPDATE inventory.categories
                    SET ${setClause}
                WHERE id = ($${keys.length + 1})
                RETURNING *`,
        params: [...values, id],
      });

      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new CategoryNotFoundError();
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const res = await sql({
        query: `DELETE FROM inventory.categories
                              WHERE id = ($1)
                            `,
        params: [id],
      });

      if (res.rowCount) {
        return true;
      }

      throw new CategoryNotFoundError(`No category with id '${id}`);
    } catch (err) {
      throw new CategoryNotFoundError();
    }
  }

  async create(
    args: Pick<Category, "abbrev_code" | "name" | "description">
  ): Promise<Category> {
    try {
      const result = await sql({
        query: `INSERT INTO inventory.categories (name, abbrev_code, description) VALUES ($1, $2, $3) RETURNING *;`,
        params: [args.name, args.abbrev_code, args.description],
      });

      if (!result.rowCount) {
        throw new CategoryCreationError();
      }

      return result.rows[0];
    } catch (err: any) {
      const msg = err?.message || "";

      if (/duplicate key value.*categories_name_key/i.test(msg)) {
        throw new CategoryCreationError("Category name already exists.");
      }

      if (/relation ".*" does not exist/i.test(msg)) {
        logger.error("Database table 'inventory.categories' does not exists");
        throw new CategoryCreationError("DB domain error.");
      }

      logger.error(CategoryDAO.name, err);
      throw new CategoryCreationError(err);
    }
  }
}
