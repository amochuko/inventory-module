import { createLogger } from "graphql-yoga";
import ValidationError from "../../../../common/error/validation.error";
import { Category } from "../../../generated-types/graphql";
import { BaseModel } from "../../../types/base.model";
import { CategoryCreateArgs } from "../validation/category.schema";

const logger = createLogger("debug");
export class CategoryModel extends BaseModel<CategoryCreateArgs> {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _createdAt: Date | null,
    private _updatedAt: Date | null
  ) {
    super();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get abbrev_code() {
    return this._getAbbrevationCodeFromName(this._name);
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  private validate() {
    if (this._name.trim() === "") {
      throw new ValidationError("Supplier name cannot be empty.");
    }

    if (this._description.trim() === "") {
      throw new ValidationError("Supplier description cannot be empty.");
    }
  }

  private _getAbbrevationCodeFromName(name: string) {
    const nameArr = name.split(" ");

    return nameArr.length > 1
      ? nameArr
          .map((n) => n.substring(0, 1))
          .join("")
          .substring(0, 3)
          .toUpperCase() +
          "-" +
          name.length
      : name.substring(0, 3).toUpperCase() + "-" + name.length;
  }

  private _touch() {
    this._updatedAt = new Date();
  }

  static createFromDTO(dto: CategoryCreateArgs): CategoryModel {
    return new CategoryModel("", dto.name, dto.description, null, null);
  }

  // Factory for suppliers loaded from DB
  static rebuildFromPersistence(data: Category): CategoryModel {
    return new CategoryModel(
      data.id,
      data.name,
      data.description,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  override toPersistence(): CategoryCreateArgs {
    return {
      name: this._name,
      description: this._description,
    };
  }

  override toJson(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
