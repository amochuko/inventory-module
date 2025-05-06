import { Injectable } from "graphql-modules";

import { ErrorCodes } from "../../../common/error/error.codes";
import { validateOrThrow } from "../../../common/utils/zod-utils";
import { Category, FilterCategoryInput } from "../../generated-types/graphql";
import { CategoryRepository } from "./category.repo";
import { CategoryModule } from "./generated-types/module-types";
import { CategoryModel } from "./model/category.model";
import {
  CategoryCreateArgs,
  CategoryCreateArgSchema,
} from "./validation/category.schema";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    // TODO: validate args input
    // const catModel =
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

  async deleteById(id: string): Promise<boolean> {
    //TODO: validate args input
    return await this.categoryRepo.deleteById(id);
  }

  async save(args: CategoryCreateArgs): Promise<CategoryModel> {
    const validated = validateOrThrow({
      schema: CategoryCreateArgSchema,
      input: args,
      errorMsg: "Validation failed for CategoryCreateArgs",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    const model = CategoryModel.createFromDTO(validated);

    return await this.categoryRepo.insert(model);
  }
}
