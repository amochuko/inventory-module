import { SupplierModule } from "../../generated-types/module-types";
import { SupplierDAO } from "../../supplier.dao";

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

  describe("create", () => {
    it.only("should create and retrieve a supplier", async () => {
      const res = await dao.create({
        name: "Zod Ventures",
        email: "zod@gmail.com",
        phone: "0913478230",
        description: "Best home made crafters",
        address: "Alan road avenue",
      });

      // const supplier = await dao.findById(res.id);
      console.log(res);
      // expect(res).toBe(
      //   expect.objectContaining({ id: res.id, name: supplier.name })
      // );
    });

    // it("should throw on a failed creation", async () => {
    //   (sql as jest.Mock).mockRejectedValueOnce(
    //     mockPgError({
    //       code: "23505",
    //       message:
    //         'duplicate key value violates unique constraint "supplier_name_key"',
    //     })
    //   );

    //   await expect(
    //     dao.create({
    //       name: "Duplicate",
    //       email: "zod@gmail.com",
    //       phone: "0913478230",
    //       description: "Best home made crafters",
    //       address: "Alan road avenue",
    //     })
    //   ).rejects.toThrow("SUPPLIER with this name already exists.");
    // });

    // it("should throw NOT_FOUND error for foreign ket violation", async () => {
    //   (sql as jest.Mock).mockRejectedValueOnce(
    //     mockPgError({
    //       code: "23503",
    //       message:
    //         'insert or update on table "suppliers" violates foreign key constraint',
    //     })
    //   );

    //   await expect(dao.create(suppliers[0])).rejects.toThrow(
    //     "Foreign key constraint failed. Related entity not found."
    //   );
    // });

    // it("should throw VALIDATION_ERROR for null field", async () => {
    //   (sql as jest.Mock).mockRejectedValueOnce(
    //     mockPgError({
    //       code: "23502",
    //       message: 'null value in column "name" violates not-null constraint',
    //     })
    //   );

    //   await expect(dao.create(suppliers[0])).rejects.toThrow(
    //     "A required field is missing or null."
    //   );
    // });

    // it("should throw SAERVER_ERROR for unknown DB issues", async () => {
    //   (sql as jest.Mock).mockRejectedValueOnce(
    //     mockPgError({
    //       code: "99999",
    //       message: "some unknown database issue",
    //     })
    //   );

    //   await expect(dao.create(suppliers[0])).rejects.toThrow(
    //     "Unexpected error occurred while working with SUPPLIER."
    //   );
    // });
  });
});
