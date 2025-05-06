import ValidationError from "../../../../../common/error/validation.error";
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
    const abbrevCode = model.abbrev_code;
    expect(abbrevCode).toBe("ELE-11");
  });

  it("should update category", () => {
    model.mergeUpdate({
      description: "The state of the nationn in Electron 121",
      name: "Electronics Zippers",
    });

    expect(model.name).toEqual(expect.stringContaining("Zippers"));
  });

  it("should throw when updated with empty name", () => {
    expect(() =>
      model.mergeUpdate({
        description: "The state of the nationn in Electron 121",
        name: "",
      })
    ).toThrow(ValidationError);
  });
});
