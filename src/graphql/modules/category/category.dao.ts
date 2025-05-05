import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";

import { sql } from "../../../common/database/sqlConnection";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import { IDAO } from "../interface/dao.interface";
import {
  CategoryCreationError,
  CategoryFindAllError,
  CategoryNotFoundError,
} from "./category.error";

const logger = createLogger("error");

@Injectable()
export default class CategoryDAO implements IDAO<Category> {
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

      let text = `SELECT * FROM inventory.categories`;

      if (conditions.length > 0) {
        text += ` WHERE ${conditions.join(" AND ")}`;
      }

      text += ` ORDER BY id ASC`;

      if (args?.take) {
        text += ` LIMIT ($${paramIndex++})`;
        params.push(args.take);
      }

      if (args?.skip) {
        text += ` OFFSET ($${paramIndex++})`;
        params.push(args.skip);
      }

      const res = await sql({ text, params });

      return res.rows;
    } catch (err) {
      logger.error(CategoryDAO.name, err);
      if (err instanceof Error) {
        throw err.message;
      }

      throw new CategoryFindAllError();
    }
  }

  async findById(id: string): Promise<Category> {
    try {
      const result = await sql({
        text: `SELECT * FROM inventory.categories
        WHERE id = ($1)`,
        params: [id],
      });

      if (!result.rowCount) {
        throw new CategoryNotFoundError();
      }

      return result.rows[0];
    } catch (err) {
      logger.error(CategoryDAO.name, err);
      throw new CategoryNotFoundError();
    }
  }

  async updateById(id: string, body: Partial<Category>): Promise<Category> {
    try {
      const keys = Object.keys(body) as (keyof typeof body)[];

      const setClause = keys.map((k, i) => `${k} = ($${i + 1})`).join(", ");
      const values = keys.map((k) => body[k]);

      const query = `UPDATE inventory.categories
                      SET ${setClause}
                      WHERE id = ($${keys.length + 1})
                      RETURNING *`;

      const result = await sql({
        text: query,
        params: [...values, id],
      });

      if (!result.rowCount) {
        throw new CategoryNotFoundError(`Category with id '${id}' not found.`);
      }

      return result.rows[0];
    } catch (err) {
      logger.error(CategoryDAO.name, err);
      throw new CategoryNotFoundError();
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const res = await sql({
        text: `DELETE FROM inventory.categories
                WHERE id = ($1)
                RETURNING *`,
        params: [id],
      });

      if (!res.rowCount) {
        throw new CategoryNotFoundError(`Category with id '${id}' not found.`);
      }

      return true;
    } catch (err) {
      logger.error(CategoryDAO.name, err);
      throw new CategoryNotFoundError();
    }
  }

  async insert(
    args: Pick<Category, "abbrev_code" | "name" | "description">
  ): Promise<Category> {
    try {
      const result = await sql({
        text: `INSERT INTO inventory.categories (name, abbrev_code, description) VALUES ($1, $2, $3) RETURNING *;`,
        params: [args.name, args.abbrev_code, args.description],
      });

      if (!result.rowCount) {
        throw new CategoryCreationError();
      }

      return result.rows[0];
    } catch (err: any) {
      logger.error(CategoryDAO.name, err);

      const msg = err?.message || "";

      if (/duplicate key value.*categories_name_key/i.test(msg)) {
        throw new CategoryCreationError("Category name already exists.");
      }

      if (/violates check constraint*categories_name_non_empty/i.test(msg)) {
        throw new CategoryCreationError("Category name must not be empty.");
      }

      if (/relation ".*" does not exist/i.test(msg)) {
        logger.error("Database table 'inventory.categories' does not exists");
        throw new CategoryCreationError("DB domain error.");
      }

      throw new CategoryCreationError(err);
    }
  }
}
