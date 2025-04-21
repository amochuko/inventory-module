import { sql } from "../../../../config/database/sqlConnection";
import CategoryDAO from "../category.dao";

jest.mock("../../../../config/database/sqlConnection", () => ({
  sql: jest.fn(),
}));

describe("CategoryDAO", () => {
  const dao = new CategoryDAO();

  it("should create a category successfully", async () => {
    const mockCategory = {
      name: "Electronics",
      abbrevCode: "ELE",
      description: "Tech",
    };

    (sql as jest.Mock).mockReturnValue({
      rowCount: 1,
      rows: [mockCategory],
    });

    const result = await dao.create({
      abbrevCode: "ELE",
      description: "TECH",
      name: "Electronic",
    });

    expect(result).toEqual(mockCategory);
  });
});
