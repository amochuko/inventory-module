import { Injectable } from "graphql-modules";
import { Product } from "../../generated-types/graphql";
import ProductDAO from "./product.dao";
import { CreateProductArgs } from "../typings/products";

@Injectable()
export class ProductService {
  constructor(private productDAO: ProductDAO) {}

  async create(args: CreateProductArgs): Promise<Product> {
    return await this.productDAO.create(args);
  }

  async getAll(): Promise<Product[]> {
    return await this.productDAO.getAll();
  }

  async getById(id: string): Promise<Product> {
    return await this.productDAO.getById({ id });
  }

  async updateById(id: string, product: Partial<Product>): Promise<Product> {
    return await this.productDAO.updateById({ id, product });
  }

  async deleteById(id: string): Promise<"Ok" | string> {
    return await this.productDAO.deleteById({ id });
  }
}
