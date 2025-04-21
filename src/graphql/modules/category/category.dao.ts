import { Injectable } from "graphql-modules";
import { createLogger } from "graphql-yoga";
import { sql } from "../../../config/database/sqlConnection";
import { Category } from "../../generated-types/graphql";
import { CategoryCreationError, CategoryFindAllError } from "./category.error";
import { ICategory } from "./category.interface";

const logger = createLogger("error");

@Injectable()
export default class CategoryDAO implements ICategory {
  findById(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, body: Partial<Category>): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }

  async create(
    args: Pick<Category, "abbrevCode" | "name" | "description">
  ): Promise<Category> {
    try {
      const result = await sql({
        query: `INSERT INTO inventory.categories (name, abbrev_code, description) VALUES ($1, $2, $3) RETURNING *;`,
        params: [args.name, args.abbrevCode, args.description],
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

  async findAll(): Promise<Category[]> {
    try {
      const res = await sql({
        query: `SELECT * FROM inventory.categories
        ORDER BY id ASC`,
        params: [],
      });

      return res.rows;
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new CategoryFindAllError();
    }
  }
}
