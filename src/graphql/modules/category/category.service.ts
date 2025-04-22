import { Injectable } from "graphql-modules";
import { getAbbrevationCodeFromName } from "../../../common/utils/helpers";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import { CategoryCreationError } from "./category.error";
import { ICategory } from "./category.interface";
import { CategoryRepository } from "./category.repo";
import { CategoryModule } from "./generated-types/module-types";

@Injectable()
export class CategoryService implements ICategory {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    // TODO: validate args input
    return await this.categoryRepo.findAll(args);
  }

  async findById(id: string): Promise<Category> {
    // TODO: validate args input
    return await this.categoryRepo.findById(id);
  }

  async updateById(
    id: string,
    body: Partial<CategoryModule.Category>
  ): Promise<Category> {
    //TODO: validate args input

    if (body.name) {
      // update abbre_code
      body.abbrev_code = getAbbrevationCodeFromName(body.name);
      return await this.categoryRepo.updateById(id, body);
    }

    return await this.categoryRepo.updateById(id, body);
  }


  async create(
    args: Pick<Category, "name" | "description">
  ): Promise<Category> {
    try {
      // TODD: Add validation logic here
      const abbrevCode = getAbbrevationCodeFromName(args.name);
      return await this.categoryRepo.create({
        ...args,
        abbrev_code: abbrevCode,
      });
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
