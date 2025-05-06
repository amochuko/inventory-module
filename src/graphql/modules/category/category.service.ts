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
  CategoryIdSchema,
  CategoryUpdateArgSchema,
} from "./validation/category.schema";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async findAll(args?: FilterCategoryInput): Promise<Category[]> {
    // TODO: validate args input
    // const catModel =
    return await this.categoryRepo.findAll(args);
  }

  async findById(id: string): Promise<CategoryModel> {
    id = this._validateId(id)["id"];

    return await this.categoryRepo.findById(id);
  }

  async updateById(
    id: string,
    body: Partial<CategoryModule.Category>
  ): Promise<CategoryModel> {
    id = this._validateId(id)["id"];

    const validated = validateOrThrow({
      schema: CategoryUpdateArgSchema,
      input: { id, body },
      errorMsg: "Validation failed for update args",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    const category = await this.categoryRepo.findById(id);
    category.mergeUpdate(validated!);

    const newUpdate = {
      ...category.toPersistence(),
      ...validated,
    };

    return await this.categoryRepo.updateById(id, newUpdate);
  }

  async deleteById(id: string): Promise<boolean | null> {
    id = this._validateId(id)["id"];
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

  private _validateId(id: string) {
    const validated = validateOrThrow({
      schema: CategoryIdSchema,
      input: id,
      errorMsg: "Validation failed for id as valid UUID",
      errorCode: ErrorCodes.VALIDATION_ERROR,
    });

    return validated;
  }
}
