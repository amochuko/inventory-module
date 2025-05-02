
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

  it("should return abbrev code", () => {
    const abbrevCode = model.abbrevCode;
    expect(abbrevCode).toBe("ELE-11");
  });

  it("should validate insert input", () => {
    const validated = model.validate();

    expect(validated.data).toEqual(
      expect.objectContaining({
        name: "electronics",
        description: "electronics and gadget",
      })
    );
  });

  it("should throw if validation fails", () => {
    const model = new CategoryModel("12", "", "", new Date(), new Date());

    expect(() => model.validate()).toThrow(ValidationError);
  });
});
