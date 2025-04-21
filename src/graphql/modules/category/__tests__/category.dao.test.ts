import { sql } from "../../../../config/database/sqlConnection";
import CategoryDAO from "../category.dao";

jest.mock("../../../../config/database/sqlConnection", () => ({
  sql: jest.fn(),
}));

const mockCategories = [
  {
    name: "Electronics",
    abbrev_code: "ELE",
    description: "Tech",
  },
  {
    name: "Food",
    abbrev_code: "FOD",
    description: "Feed house",
  },
];

describe("CategoryDAO", () => {
  const dao = new CategoryDAO();

  it("should create a category successfully", async () => {
    (sql as jest.Mock).mockReturnValue({
      rowCount: 1,
      rows: mockCategories,
    });

    const result = await dao.create({
      abbrev_code: "ELE",
      description: "TECH",
      name: "Electronic",
    });

    expect(result).toEqual(mockCategories[0]);
  });

  it("should throw a creation error if insert fails", async () => {
    (sql as jest.Mock).mockReturnValue({ rowCount: 0, rows: [] });

    await expect(
      dao.create({ name: "Fail", abbrev_code: "FAIL", description: "none" })
    ).rejects.toThrow("Failed to create category");
  });

  it("should detect duplicate constraint violation", async () => {
    (sql as jest.Mock).mockRejectedValue(
      new Error(
        'duplicate key value violates unique constraint "categories_name_key"'
      )
    );

    await expect(
      dao.create({ name: "Duplicate", abbrev_code: "DUP", description: "Copy" })
    ).rejects.toThrow("Category name already exists");
  });

  it("should return categories with .findAll()", async () => {
    (sql as jest.Mock).mockResolvedValue({ rowCount: 2, rows: mockCategories });

    const res = await dao.findAll();
    expect(mockCategories).toEqual(res);
  });
});
