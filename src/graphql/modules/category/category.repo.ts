import { Injectable } from "graphql-modules";
import { IDAO } from "../interface/dao.interface";
import CategoryDAO from "./category.dao";
import { CategoryModel } from "./model/category.model";
import { CategoryFilterArgs } from "./validation/category.validation";

@Injectable()
export class CategoryRepository implements IDAO<CategoryModel> {
  constructor(private readonly categoryDao: CategoryDAO) {}

  async findAll(args?: CategoryFilterArgs): Promise<CategoryModel[]> {
    const categories = await this.categoryDao.findAll(args);
    return categories.map(
      (c) =>
        new CategoryModel(
          c.id,
          c.name,
          c.description,
          c.abbrev_code,
          c.created_at,
          c.updated_at
        )
    );
  }

  async findById(id: string): Promise<CategoryModel> {
    const category = await this.categoryDao.findById(id);
    return CategoryModel.rebuildFromPersistence(category);
  }

  async updateById(
    id: string,
    body: Partial<CategoryModel>
  ): Promise<CategoryModel> {
    const category = await this.categoryDao.updateById(id, body);
    return CategoryModel.rebuildFromPersistence(category);
  }

  async deleteById(id: string): Promise<boolean | null> {
    return await this.categoryDao.deleteById(id);
  }

  async insert(
    args: Pick<CategoryModel, "name" | "abbrev_code" | "description">
  ): Promise<CategoryModel> {
    const result = await this.categoryDao.insert(args);

    return CategoryModel.rebuildFromPersistence(result);
  }
}
