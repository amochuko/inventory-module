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
});
