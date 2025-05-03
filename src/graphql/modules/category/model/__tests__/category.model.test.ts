import ValidationError from "../../../../../error/validation.error";
import { CategoryModel } from "../category.model";

describe("CategoryModel", () => {
  let model: CategoryModel;

  beforeEach(() => {
    model = new CategoryModel(
      "12",
      "electronics",
      "electronics and gadget",
      new Date(),
      new Date()
    );
  });

  it("should return name", async () => {
    const name = model.name;

    expect(name).toBe("electronics");
  });

  it("should return the model from a dto", () => {
    const categoryModel = CategoryModel.createFromDTO({
      name: "Jack Mouse",
      description: "This is the Jack screw brand.",
    });

    expect(categoryModel).toEqual(
      expect.objectContaining({ name: "Jack Mouse" })
    );
  });

  it("should return abbrev code", () => {
    const abbrevCode = model.abbrevCode;
    expect(abbrevCode).toBe("ELE-11");
  });

  it("should validate insert input", () => {
    const validated = model.validateInsertData();

    expect(validated.data).toEqual(
      expect.objectContaining({
        name: "electronics",
        description: "electronics and gadget",
      })
    );
  });

  it("should throw if validation fails for insert input", () => {
    const model = new CategoryModel("12", "", "", new Date(), new Date());

    expect(() => model.validateInsertData()).toThrow(ValidationError);
  });

  it("should throw if validation fails for update input", () => {
    const model = new CategoryModel("12", "", "", new Date(), new Date());

    expect(() => model.validateUpdateData()).toThrow(ValidationError);
  });
});
