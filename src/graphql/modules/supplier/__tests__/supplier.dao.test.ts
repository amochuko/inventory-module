import { mockPgError } from "../../../../common/database/mockPgError";
import { sql } from "../../../../common/database/sqlConnection";
import { SupplierModule } from "../generated-types/module-types";
import { SupplierDAO } from "../supplier.dao";

jest.mock("../../../../common/database/sqlConnection", () => ({
  sql: jest.fn(),
}));

const suppliers: SupplierModule.Supplier[] = [
  {
    id: "1",
    name: "Zod Ventures",
    email: "zod@gmail.com",
    phone: "0913478230",
    description: "Best home made crafters",
    address: "Alan road avenue",
    created_at: 1745456019890,
    updated_at: 1745456019890,
  },
];

describe("SupplierDAO", () => {
  const dao = new SupplierDAO();

  describe("create", () => {
    it("should create a supplier", async () => {
      (sql as jest.Mock).mockReturnValue({
        rowCount: 1,
        rows: suppliers,
      });

      const res = await dao.create({
        name: "Zod Ventures",
        email: "zod@gmail.com",
        phone: "0913478230",
        description: "Best home made crafters",
        address: "Alan road avenue",
      });

      expect(res).toBe(suppliers[0]);
    });

    it("should throw on a failed creation", async () => {
      (sql as jest.Mock).mockRejectedValueOnce(
        mockPgError({
          code: "23505",
          message:
            'duplicate key value violates unique constraint "supplier_name_key"',
        })
      );

      await expect(
        dao.create({
          name: "Duplicate",
          email: "zod@gmail.com",
          phone: "0913478230",
          description: "Best home made crafters",
          address: "Alan road avenue",
        })
      ).rejects.toThrow("SUPPLIER with this name already exists.");
    });

    it("should throw NOT_FOUND error for foreign ket violation", async () => {
      (sql as jest.Mock).mockRejectedValueOnce(
        mockPgError({
          code: "23503",
          message:
            'insert or update on table "suppliers" violates foreign key constraint',
        })
      );

      await expect(dao.create(suppliers[0])).rejects.toThrow(
        "Foreign key constraint failed. Related entity not found."
      );
    });

    it("should throw VALIDATION_ERROR for null field", async () => {
      (sql as jest.Mock).mockRejectedValueOnce(
        mockPgError({
          code: "23502",
          message: 'null value in column "name" violates not-null constraint',
        })
      );

      await expect(dao.create(suppliers[0])).rejects.toThrow(
        "A required field is missing or null."
      );
    });

    it("should throw SAERVER_ERROR for unknown DB issues", async () => {
      (sql as jest.Mock).mockRejectedValueOnce(
        mockPgError({
          code: "99999",
          message: "some unknown database issue",
        })
      );

      await expect(dao.create(suppliers[0])).rejects.toThrow(
        "Unexpected error occurred while working with SUPPLIER."
      );
    });
  });

  describe.only("findAll", () => {
    it("should list all suppliers", async () => {
      (sql as jest.Mock).mockReturnValue({
        rowCount: 1,
        rows: suppliers,
      });

      const res = await dao.findAll();
      expect(res.length).toBe(1);
    });

    it("should list all suppliers", async () => {
      (sql as jest.Mock).mockReturnValue({
        rowCount: 1,
        rows: suppliers,
      });

      const res = await dao.findAll();
      expect(res.length).toBe(1);
    });

    it("should return empty array", async () => {
      (sql as jest.Mock).mockReturnValue({
        rowCount: 0,
        rows: [],
      });

      const res = await dao.findAll();
      expect(res.length).toBe(0);
      expect(res).toEqual([]);
    });



  });
});
