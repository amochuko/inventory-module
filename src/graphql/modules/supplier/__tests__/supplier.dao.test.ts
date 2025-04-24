import { sql } from "../../../../config/database/sqlConnection";
import { SupplierModule } from "../generated-types/module-types";
import { SupplierDAO } from "../supplier.dao";

jest.mock("../../../../config/database/sqlConnection", () => ({
  sql: jest.fn(),
}));

const suppliers: SupplierModule.Supplier[] = [
  {
    id: '1',
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

      expect(res).toBe(suppliers[0])
    });
  });
});
