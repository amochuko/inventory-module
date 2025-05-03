import { createLogger } from "graphql-yoga";
import { z } from "zod";
import { ErrorCodes } from "../../../../error/error.codes";
import ValidationError from "../../../../error/validation.error";
import { Category } from "../../../generated-types/graphql";
import { BaseModel } from "../../../types/base.model";

const DeleteCategoryArgSchema = z.object({
  id: z.coerce
    .string()
    .trim()
    .regex(/^\d+$/, "Category ID must be numeric string"),
});

const UpdateCategoryArgSchema = z.object({
  id: z.coerce
    .string()
    .trim()
    .regex(/^\d+$/, "Category ID must be numeric string"),
  body: z.object({
    name: z
      .string({
        required_error: "Description must not be empty",
        invalid_type_error: "Description must be a string",
      })
      .trim()
      .min(2, { message: "Name is required." })
      .optional(),
    description: z
      .string({
        required_error: "Description must not be empty",
        invalid_type_error: "Description must be a string",
      })
      .trim()
      .min(1, { message: "Description is required." })
      .optional(),
  }),
});

const CreateCategoryArgSchema = z.object({
  name: z
    .string({
      required_error: "Name must not be empty",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(2, { message: "Name is required." }),
  description: z
    .string({
      required_error: "Description must not be empty",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, { message: "Description is required." }),
});

const logger = createLogger("debug");

type CreateCategoryInput = z.infer<typeof CreateCategoryArgSchema>;
type CreateCategoryArgs = CreateCategoryInput;

export class CategoryModel extends BaseModel<CreateCategoryArgs> {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _createdAt: Date | null,
    private _updatedAt: Date | null
  ) {
    super();
    this._touch();
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
  get abbrevCode() {
    return this._getAbbrevationCodeFromName(this._name);
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  validateInsertData() {
    const validation = CreateCategoryArgSchema.safeParse({
      name: this.name,
      description: this.description,
    });

    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn(
        "Validation failed for createCategory args",
        validationErrors
      );

      throw new ValidationError("Invalid input for create category", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    return validation;
  }

  validateUpdateData() {
    const validation = CreateCategoryArgSchema.safeParse({
      name: this.name,
      description: this.description,
    });

    if (!validation.success) {
      const validationErrors = validation.error.format();

      logger.warn(
        "Validation failed for createCategory args",
        validationErrors
      );

      throw new ValidationError("Invalid input for create category", {
        extensions: {
          code: ErrorCodes.VALIDATION_ERROR,
          errors: validationErrors,
        },
      });
    }

    return validation;
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

  static createFromDTO(dto: CreateCategoryInput): CategoryModel {
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

  override toPersistence(): CreateCategoryInput {
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
