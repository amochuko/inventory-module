import { mockPgError } from "../../../../../common/database/mockPgError";
import { sql } from "../../../../../common/database/sqlConnection";
import { mockFindById } from "../../../__tests__/dao.mock";
import { SupplierModule } from "../../generated-types/module-types";
import { SupplierDAO } from "../../supplier.dao";

jest.mock("../../../../../common/database/sqlConnection", () => ({
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
  {
    id: "2",
    name: "Timeless Stand",
    email: "timeless@yahoo.com",
    phone: "09111223344",
    description: "Best home made crafters",
    address: "Alan road avenue",
    created_at: 1745456019890,
    updated_at: 1745456019890,
  },
  {
    id: "3",
    name: "Flight Land",
    email: "flight_land@gmail.com",
    phone: "07022324596",
    description: "Best home made crafters",
    address: "Alan road avenue",
    created_at: 1745456019890,
    updated_at: 1745456019890,
  },
  {
    id: "4",
    name: "Red Road",
    email: "red_road@msn.com",
    phone: "08012112233",
    description: "Best home made crafters",
    address: "Alan road avenue",
    created_at: 1745456019890,
    updated_at: 1745456019890,
  },
  {
    id: "8",
    name: "Timeless About",
    email: "timeless%@gmail.com",
    description: "Best home made crafters",
    address: "Alan road avenue",
    phone: "08199999999",
    created_at: 1745587691620,
  },
  {
    id: "9",
    name: "Timeout Landers",
    email: "timeout%@gmail.com",
    description: "Best home made crafters",
    address: "Alan road avenue",
    phone: "07120202000",
    created_at: 1745587774721,
  },
  {
    id: "10",
    name: "Time Overdraft",
    email: "timeline%@gmail.com",
    description: "Best home made crafters",
    address: "Alan road avenue",
    phone: "07120202000",
    created_at: 1745587816203,
  },
];

describe("SupplierDAO", () => {
  const dao = new SupplierDAO();

  afterEach(() => {
    jest.resetAllMocks();
  });

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

  describe("findAll", () => {
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

    describe("findAll(filter)", () => {
      it("should return data based on filter", async () => {
        const filterredSuppliers = suppliers.filter((s) =>
          s.email.includes("timeless")
        );

        (sql as jest.Mock).mockReturnValue({
          rowCount: 1,
          rows: filterredSuppliers,
        });

        const res = await dao.findAll({
          filter: {
            by: "EMAIL",
            term: "timeless",
            take: 2,
          },
        });

        expect(res.length).toBe(filterredSuppliers.length);
        expect(res).toEqual(filterredSuppliers);
      });

      it("should return empty array based on filter", async () => {
        const filterredSuppliers = suppliers.filter((s) =>
          s.email.includes("riad jack")
        );

        (sql as jest.Mock).mockReturnValue({
          rowCount: 1,
          rows: filterredSuppliers,
        });

        const res = await dao.findAll({
          filter: {
            by: "EMAIL",
            term: "riad jack",
          },
        });

        expect(res.length).toBe(0);
        expect(res).toEqual([]);
      });
    });
  });

  describe("findById", () => {
    it("should return supplier by id", async () => {
      const filterredSuppliers = suppliers.filter((s) => s.id == "2");

      (sql as jest.Mock).mockReturnValue({
        rowCount: 1,
        rows: filterredSuppliers,
      });

      const res = await dao.findById("3");

      expect(res).toEqual(filterredSuppliers[0]);
    });

    it("should thrown when no such supplier by id", async () => {
      const id = "3";
      const err = `Supplier with id '${id}' not found.`;

      (sql as jest.Mock).mockReturnValueOnce(err);

      await expect(dao.findById(id)).rejects.toThrow(err);
    });
  });

  describe("updateById", () => {
    it("should thrown when no such supplier by id", async () => {
      const id = "20003";
      const err = `Supplier with id '${id}' not found.`;

      (sql as jest.Mock).mockRejectedValue(new Error(err));

      await expect(
        dao.updateById(id, { email: "new@email.com" })
      ).rejects.toThrow(err);
    });

    it("should update a supplier by id", async () => {
      const id = "3";
      const email = "new@email.com";

      // 1. Mock sql to simulate a real existing supplier
      mockFindById(dao, { id });

      // 2. Mock sql to simulate a successful update
      (sql as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id, email }],
      });

      const res = await dao.updateById(id, { email });

      expect(res.email).toBe(email);
      expect(dao.findById).toHaveBeenCalledWith(id);
    });
  });

  describe.only("deleteById", () => {
    it("should thrown when no such supplier by id", async () => {
      const id = "20003";
      const err = `Supplier with id '${id}' not found.`;

      (sql as jest.Mock).mockRejectedValue(new Error(err));

      await expect(dao.deleteById(id)).rejects.toThrow(err);
    });


  });
});
