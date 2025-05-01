import { SupplierModel } from "../../model/supplier.model";
import { SupplierRepo } from "../../supplier.repo";
import { SupplierService } from "../../supplier.service";

describe("SupplierService", () => {
  let service: SupplierService;
  let repo: jest.Mocked<SupplierRepo>;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      save: jest.fn(),
      insert: jest.fn(),
      deleteById: jest.fn(),
    } as any;

    service = new SupplierService(repo);
  });

  describe("create", () => {
    const mockSupplier = SupplierModel.createFromDTO({
      address: "12 house",
      description: "The same",
      email: "new@email.com",
      name: "jon doe",
      phone: "+2347063113438",
    });

    it("should create a supplier", async () => {
      await service.insert(mockSupplier);

      expect(repo.save).toHaveBeenCalledWith(mockSupplier);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });

    it("should create a supplier and return the data", async () => {
      repo.save.mockResolvedValue(mockSupplier);

      const res = await service.insert(mockSupplier);

      expect(res).toEqual(mockSupplier);
    });
  });

  describe("findById", () => {
    it("should return a supplier by id", async () => {
      repo.findById.mockResolvedValue(
        SupplierModel.rebuildFromPersistence({ id: "1", name: "Jack Ma" })
      );

      const res = await service.findById("1");
      expect(repo.findById).toHaveBeenCalledWith("1");
      expect(res).toEqual(expect.objectContaining({ _id: "1" }));
    });

    it("should throw when supplier by id does not exit", async () => {
      repo.findById.mockRejectedValue(
        new Error("Supplier with id does not exist")
      );

      await expect(service.findById("1")).rejects.toThrow(
        new Error("Supplier with id does not exist")
      );
    });
  });

  describe("updateEmail", () => {
    const supplier = SupplierModel.rebuildFromPersistence({
      id: 123,
      name: "Fresh Farms",
      email: "old@email.com",
      phone: "12334567890",
      created_at: new Date(),
      updated_at: new Date(),
    });

    it("should update supplier emai and save it", async () => {
      repo.findById.mockResolvedValue(supplier);
      repo.save.mockResolvedValue(supplier);

      const result = await service.updateEmail("123", "new@email.com");

      expect(repo.findById).toHaveBeenCalledWith("123");
      expect(repo.save).toHaveBeenCalledWith(expect.any(SupplierModel));
      expect(result.email).toBe("new@email.com");
    });

    it("should throw if email is invalid", async () => {
      repo.findById.mockResolvedValue(supplier);

      await expect(service.updateEmail("123", "not-an-email")).rejects.toThrow(
        "Invalid email format."
      );
    });
  });

  describe("deleteById", () => {
    it("should throw if id does not exist", async () => {
      repo.deleteById.mockRejectedValue(new Error("Supplier not found."));

      await expect(service.deleteById("23")).rejects.toThrow(
        "Supplier not found."
      );
    });
  });
});
