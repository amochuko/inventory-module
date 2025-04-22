import { Injectable } from "graphql-modules";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import CategoryDAO from "./category.dao";
import { ICategory } from "./category.interface";

@Injectable()
export class CategoryRepository implements ICategory {
  constructor(private readonly categoryDao: CategoryDAO) {}

  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    return await this.categoryDao.findAll(args);
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryDao.findById(id);
  }

  updateById(id: string, body: Partial<Category>): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: string): Promise<Boolean> | void {
    throw new Error("Method not implemented.");
  }

  async create(
    args: Pick<Category, "name" | "abbrev_code" | "description">
  ): Promise<Category> {
    const result = await this.categoryDao.create(args);
    return result;
  }
}
