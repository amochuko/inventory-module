import { sql } from "../../../../../common/database/sqlConnection";
import { simulateServerError } from "../../../../util/test-utils/simulateServerError";
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
];

describe("SupplierDAO", () => {
  const dao = new SupplierDAO();

  describe("create", () => {
    it("should create and retrieve a supplier", async () => {
      const createdSupplier = await dao.insert(suppliers[0]);
      const foundSupplier = await dao.findById(createdSupplier.id);

      expect(createdSupplier).toEqual(
        expect.objectContaining({
          id: createdSupplier.id,
          name: foundSupplier.name,
        })
      );
    });

    it("should throw when inserting a supplier with null name", async () => {
      await expect(
        dao.insert({
          ...suppliers[1],
          name: null as any,
        })
      ).rejects.toThrow(
        /null value in column "name" of relation "suppliers" violates not-null constraint/i
      );
    });

    it("should reject when creating a user with existing name", async () => {
      await dao.insert({
        name: "Duplicate",
        email: "zod@gmail.com",
        phone: "0913478230",
        description: "Best home made crafters",
        address: "Alan road avenue",
      });

      await expect(
        dao.insert({
          ...suppliers[0],
          name: "Duplicate",
        })
      ).rejects.toThrow(
        /duplicate key value violates unique constraint \"suppliers_name_key\"/i
      );
    });

    it("should throw NOT_FOUND error for foreign key violation", async () => {
      await expect(dao.findById(suppliers[1].id)).rejects.toThrow(
        `Supplier with id '${suppliers[1].id}' not found.`
      );
    });

    it("should throw SERVER_ERROR for unknown DB issues", async () => {
      await expect(simulateServerError).rejects.toThrow("SERVER_ERROR");
    });

    it("should list all suppliers", async () => {
      await dao.insert(suppliers[0]);

      const res = await dao.findAll();
      expect(res.length).toBe(suppliers.length - 1);
    });

    it("should return empty array", async () => {
      await sql({ text: `DELETE FROM inventory.suppliers` });

      const res = await dao.findAll();

      expect(res.length).toBe(0);
      expect(res).toEqual([]);
    });

    it("should return data based on filter", async () => {
      await dao.insert(suppliers[0]);
      await dao.insert(suppliers[1]);

      const filterredSuppliers = suppliers.filter((s) =>
        s.email.includes("time")
      );

      const res = await dao.findAll({
        filter: {
          by: "EMAIL",
          term: "timeless",
        },
      });

      expect(res.length).toBe(filterredSuppliers.length);
    });

    it("should return empty array based on filter", async () => {
      const res = await dao.findAll({
        filter: {
          by: "EMAIL",
          term: "riad jack",
        },
      });

      expect(res.length).toBe(0);
    });

    it("should return supplier by id", async () => {
      const filterredSuppliers = suppliers.filter((s) => s.id == "1");
      await dao.insert(suppliers[0]);
      await dao.insert(suppliers[1]);

      const res = await dao.findById("1");
      expect(res.id.toString()).toBe(filterredSuppliers[0].id);
    });

    it("should thrown when no such supplier by id", async () => {
      const id = "3";
      const err = `Supplier with id '${id}' not found.`;

      await expect(dao.findById(id)).rejects.toThrow(err);
    });
  });

  describe("updateById", () => {
    it("should thrown when no such supplier by id", async () => {
      const id = "20003";
      const err = `Supplier with id '${id}' not found.`;

      await expect(
        dao.updateById(id, { email: "new@email.com" })
      ).rejects.toThrow(err);
    });

    it("should update a supplier by id", async () => {
      const email = "new.rock@gmail.com";

      const result = await dao.insert(suppliers[0]);

      const res = await dao.updateById(result.id, { email });

      expect(res.email).toBe(email);
    });
  });

  describe("deleteById", () => {
    it("should thrown when no such supplier by id", async () => {
      const id = "20003";
      const err = `Delete failed for supplier id '${id}'`;

      await expect(dao.deleteById(id)).rejects.toThrow(err);
    });

    it("should delete a supplier by id", async () => {
      await dao.insert(suppliers[0]);
      const allSuppliers = await dao.findAll();

      const res = await dao.deleteById(allSuppliers[0].id);
      expect(res).toBeTruthy();
    });
  });
});
