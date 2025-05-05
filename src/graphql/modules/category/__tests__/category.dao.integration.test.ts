import { Category } from "../../../generated-types/graphql";
import CategoryDAO from "../category.dao";
import {
  CategoryCreationError,
  CategoryNotFoundError,
} from "../category.error";

const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    abbrev_code: "ELE-11",
    description: "Tech",
  },
  {
    id: 2,
    name: "Food",
    abbrev_code: "FOD-4",
    description: "Feed house",
  },
  {
    id: 3,
    name: "Food Item",
    abbrev_code: "FOD-9",
    description: "Animal feed house",
  },
];

describe("CategoryDAO", () => {
  const dao = new CategoryDAO();

  let result: Category;
  beforeEach(async () => {
    result = await dao.insert({
      abbrev_code: mockCategories[0].abbrev_code,
      description: mockCategories[0].description,
      name: mockCategories[0].name,
    });
  });

  it("should insert and retrieve category successfully", async () => {
    expect(result).toEqual(
      expect.objectContaining({ name: "Electronics", id: 1 })
    );
  });

  it("should detect duplicate constraint violation", async () => {
    await expect(
      dao.insert({
        name: mockCategories[0].name,
        abbrev_code: "DUP",
        description: "Copy",
      })
    ).rejects.toThrow("Category name already exists");
  });

  it("should throw a creation error if insert fails", async () => {
    await expect(
      dao.insert({ name: "", abbrev_code: "FAIL", description: "none" })
    ).rejects.toThrow(CategoryCreationError);
  });

  describe("findAll", () => {
    it("should return categories", async () => {
      const category = await dao.insert(mockCategories[1]);

      const res = await dao.findAll();
      expect(res).toEqual([result, category]);
    });

    it("should return categories with filter", async () => {
      await dao.insert(mockCategories[1]);
      await dao.insert(mockCategories[2]);

      const res = await dao.findAll({ filterByName: "food", skip: 0, take: 4 });

      expect(
        res.map((r) => {
          delete r.created_at;
          delete r.updated_at;
          return r;
        })
      ).toEqual(expect.objectContaining(mockCategories.slice(1)));
    });
  });

  describe("findById", () => {
    it("should return a category by id", async () => {
      const category = await dao.findById("1");

      expect(category).toEqual(expect.objectContaining(mockCategories[0]));
    });

    it("should throw if category by id is not in db", async () => {
      await expect(dao.findById("5")).rejects.toThrow(CategoryNotFoundError);
    });
  });

  describe("updateById", () => {
    const name = "Electronics and Gadgets";

    it("should update a category by id", async () => {
      const category = await dao.updateById("1", { name });

      expect(category.name).toEqual("Electronics and Gadgets");
    });

    it("should throw if category by id is not in db", async () => {
      await expect(dao.updateById("5", { name })).rejects.toThrow(
        CategoryNotFoundError
      );
    });
  });

  describe("deleteById", () => {
    it("should delete a category by id", async () => {
      const res = await dao.deleteById("1");

      expect(res).toBeTruthy();
    });

    it("should throw if category by id is not in db", async () => {
      await expect(dao.deleteById("5")).rejects.toThrow(CategoryNotFoundError);
    });
  });
});
