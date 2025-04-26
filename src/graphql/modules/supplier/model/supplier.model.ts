// import { SupplierModule } from "../generated-types/module-types";

import { CreateSupplierInput } from "../../../generated-types/graphql";
import { CreateSupplierArgs } from "../supplier.dao";

export class SupplierModel {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
    private _address: string,
    private _description: string,
    private _phone: string,
    private _createdAt: Date | null,
    private _updatedAt: Date | null
  ) {
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get address() {
    return this._address;
  }

  get phone() {
    return this._phone;
  }

  get description() {
    return this._description;
  }

  get created_at() {
    return this._createdAt;
  }

  get updated_at() {
    return this._createdAt;
  }

  updateEmail(newEmail: string) {
    if (!this.isValidEmail(newEmail)) {
      throw new Error("Invalid email format.");
    }

    this._email = newEmail;
    this.touch();
  }

  updatePhone(newPhone: string) {
    if (!/^\d{10,15}$/.test(newPhone)) {
      throw new Error("Phone must be 10-15 digits.");
    }

    this._phone = newPhone;

    this.touch();
  }

  private touch() {
    this._updatedAt = new Date();
  }

  private validate() {
    if (!this.isValidEmail(this._email)) {
      console.error("INVALID_EMAIL: ", this._email);
      //   throw new Error("Invlaid email.");
    }

    if (this._name.trim() === "") {
      throw new Error("Supplier name cannot be empty.");
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isEmailCorporate(): boolean {
    return this._email.endsWith("@company.com");
  }

  // Factory for new supplier
  static createFromDTO(dto: CreateSupplierInput): SupplierModel {
    return new SupplierModel(
      "",
      dto.name,
      dto.email,
      dto.address,
      dto.description,
      dto.phone,
      null,
      null
    );
  }

  // Factory for suppliers loaded from DB
  static rebuildFromPersistence(data: any): SupplierModel {
    return new SupplierModel(
      data.id,
      data.name,
      data.email,
      data.address,
      data.description,
      data.phone,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      address: this._address,
      description: this._description,
      phone: this._phone,
      createdAt: this._createdAt,
      updateAt: this._updatedAt,
    };
  }

  toPersistence(): CreateSupplierArgs {
    return {
      name: this._name,
      email: this._email,
      address: this._address,
      description: this._description,
      phone: this._phone,
    };
  }
}
