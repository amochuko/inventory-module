import { sql } from "../../../../common/database/sqlConnection";
import CategoryDAO from "../category.dao";
import { CategoryNotFoundError } from "../category.error";

const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    abbrev_code: "ELE-11",
    description: "Tech",
  },
  {
    id: "2",
    name: "Food",
    abbrev_code: "FOD-4",
    description: "Feed house",
  },
];

describe("CategoryDAO", () => {
  const dao = new CategoryDAO();

  it("should insert and retrieve category successfully", async () => {
    const result = await dao.insert({
      abbrev_code: "ELE-10",
      description: "TECH",
      name: "Electronic",
    });

    expect(result).toEqual(
      expect.objectContaining({ name: "Electronic", id: 1 })
    );
  });

  xit("should throw a creation error if insert fails", async () => {
    (sql as jest.Mock).mockReturnValue({ rowCount: 0, rows: [] });

    await expect(
      dao.insert({ name: "Fail", abbrev_code: "FAIL", description: "none" })
    ).rejects.toThrow("Failed to insert category");
  });

  xit("should detect duplicate constraint violation", async () => {
    (sql as jest.Mock).mockRejectedValue(
      new Error(
        'duplicate key value violates unique constraint "categories_name_key"'
      )
    );

    await expect(
      dao.insert({
        name: "Duplicate",
        abbrev_code: "DUP",
        description: "Copy",
      })
    ).rejects.toThrow("Category name already exists");
  });

  // describe("findAll", () => {
  //   it("should return categories", async () => {
  //     (sql as jest.Mock).mockResolvedValue({
  //       rowCount: 2,
  //       rows: mockCategories,
  //     });

  //     const res = await dao.findAll();
  //     expect(mockCategories).toEqual(res);
  //   });

  //   it("should return categories with filter", async () => {
  //     (sql as jest.Mock).mockResolvedValue({
  //       rowCount: 2,
  //       rows: mockCategories.slice(2),
  //     });

  //     const res = await dao.findAll({ filterByName: "food", skip: 0, take: 4 });
  //     expect(res).toEqual(mockCategories.slice(2));
  //   });
  // });

  // describe("findById", () => {
  //   it("should return a category by id", async () => {
  //     (sql as jest.Mock).mockResolvedValue({
  //       rowCount: 1,
  //       rows: [mockCategories[0]],
  //     });

  //     const category = await dao.findById("1");
  //     expect(category).toEqual(mockCategories[0]);
  //   });

  //   it("should throw if category by id is not in db", async () => {
  //     (sql as jest.Mock).mockRejectedValue(new CategoryNotFoundError());

  //     await expect(dao.findById("5")).rejects.toThrow(CategoryNotFoundError);
  //   });
  // });

  // describe("updateById", () => {
  //   const name = "Electronics and Gadgets";

  //   it("should update a category by id", async () => {
  //     (sql as jest.Mock).mockResolvedValue({
  //       rowCount: 1,
  //       rows: [{ ...mockCategories[0], name }],
  //     });

  //     const category = await dao.updateById("1", { name });

  //     expect(category.name).toEqual(name);
  //   });

  //   it("should throw if category by id is not in db", async () => {
  //     (sql as jest.Mock).mockRejectedValue(new CategoryNotFoundError());

  //     await expect(dao.updateById("5", { name })).rejects.toThrow(
  //       CategoryNotFoundError
  //     );
  //   });
  // });

  // describe("deleteById", () => {
  //   it("should delete a category by id", async () => {
  //     (sql as jest.Mock).mockResolvedValue({
  //       rowCount: 1,
  //       rows: [],
  //     });

  //     const res = await dao.deleteById("1");

  //     expect(res).toBeTruthy();
  //   });

  //   it("should throw if category by id is not in db", async () => {
  //     (sql as jest.Mock).mockRejectedValue(new CategoryNotFoundError());

  //     await expect(dao.deleteById("5")).rejects.toThrow(CategoryNotFoundError);
  //   });
  // });
});
