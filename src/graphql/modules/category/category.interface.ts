import { Category, CreateCategoryInput, FilterCategoryInput } from "../../generated-types/graphql";

 

export interface ICategory {
  create(args: CreateCategoryInput): Promise<Category>;

  findAll(args?: FilterCategoryInput): Promise<Category[]>;

  findById(id: string): Promise<Category>;

  updateById(id: string, body: Partial<Category>): Promise<Category>;

  deleteById(id: string): Promise<Boolean> | void;
}
