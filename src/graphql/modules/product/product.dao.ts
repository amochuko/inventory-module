import { Injectable } from "graphql-modules";
import { sql } from "../../../common/database/sqlConnection";
import { Product } from "../../generated-types/graphql";
import { CreateProductArgs } from "../typings/products";

@Injectable()
export default class ProductDAO {
  async create(args: CreateProductArgs): Promise<Product> {
    try {
      const result = await sql({
        text: `INSERT INTO inventory.products (name, barcode_number,
          description, category_id, supplier_id, selling_price,
          cost_price, stock_keeping_unit, stock_quantity) 
          VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *;`,
        params: [
          args.name,
          args.barcode_number as string,
          args.description,
          args.category_id,
          args.supplier_id,
          args.selling_price,
          args.cost_price,
          args.stock_keeping_unit,
          args.stock_quantity,
        ],
      });

      if (!result.rowCount) {
        throw new Error("Failed to create product");
      }

      return result.rows[0];
    } catch (err) {
      if (err instanceof Error) {
        console.error("ProductService.create", err.message);
        throw `ProductService.create: ${err.message}`;
      }

      throw new Error("Failed to create product");
    }
  }

  async getAll(): Promise<Product[]> {
    try {
      const result = await sql({
        text: `SELECT * FROM inventory.products
            ORDER BY created_at DESC`,
        params: [],
      });

      return result.rows;
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new Error("Error fetching products");
    }
  }

  async getById(args: Pick<Product, "id">): Promise<Product> {
    const result = await sql({
      text: `SELECT * FROM products
        WHERE id = ($1)`,
      params: [args.id],
    });

    return result.rows[0];
  }

  /**
   * Update product
   * @param args
   * @returns
   */
  async updateById(args: {
    id: string;
    product: Partial<Product>;
  }): Promise<Product> {
    const keys = Object.keys(args.product) as (keyof typeof args.product)[];

    const setClause = keys
      .map((key, idx) => `${String(key)} = $${idx + 1}`)
      .join(", ");
    const values = keys.map((key) => args.product[key]);

    const result = await sql({
      text: `
      UPDATE products AS p
        SET ${setClause}
      WHERE p.id = $${keys.length + 1}
      RETURNING *`,
      params: [...values, args.id],
    });

    return result.rows[0];
  }

  async deleteById(args: Pick<Product, "id">): Promise<string> {
    try {
      const result = await sql({
        text: `DELETE FROM TABLE
                  WHERE id = ($1)`,
        params: [args.id],
      });

      return result.rowCount === 0 ? "Not Found" : "Ok";
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new Error("ProductDAO.delete: failed to delete");
    }
  }
}
