import { Injectable } from "graphql-modules";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import { CategoryCreationError } from "./category.error";
import { ICategory } from "./category.interface";
import { CategoryRepository } from "./category.repo";

@Injectable()
export class CategoryService implements ICategory {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    return await this.categoryRepo.findAll();
  }

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
    args: Pick<Category, "name" | "description" | "abbrevCode">
  ): Promise<Category> {
    try {
      // TODD: Add validation logic here
      return await this.categoryRepo.create(args);
    } catch (err) {
      if (err instanceof CategoryCreationError) {
        // TODO: option call a centralized ErrorService here
        throw err.message;
      }

      console.error(CategoryService.name, "Unexpected error in : ", err);
      throw new Error("Something went wrong while creating the category.");
    }
  }
}
