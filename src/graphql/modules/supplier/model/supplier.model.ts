// import { SupplierModule } from "../generated-types/module-types";

import ValidationError from "../../../../common/error/validation.error";
import { CreateSupplierInput } from "../../../generated-types/graphql";
import { CreateSupplierArgs } from "../supplier.dao";

export class SupplierModel {
  constructor(
    private readonly _id: string,
    private readonly _public_id: string,
    private _name: string,
    private _email: string,
    private _address: string,
    private _description: string,
    private _phone: string,
    private _state: string,
    private _country: string,
    private _createdAt: Date | null,
    private _updatedAt: Date | null
  ) {
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get public_id(): string {
    return this._public_id;
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
    return this._updatedAt;
  }

  get state() {
    return this._state;
  }

  get country() {
    return this._country;
  }

  updateEmail(newEmail: string) {
    this._updateEmail(newEmail);

    this._email = newEmail;
    this._touch();
  }

  private _updateEmail(newEmail: string) {
    if (!this.isValidEmail(newEmail)) {
      throw new ValidationError("Invalid email format.");
    }
  }

  private _updatePhone(newPhone: string) {
    if (!/^\d{10,15}$/.test(newPhone)) {
      throw new ValidationError("Phone must be 10-15 digits.");
    }
  }

  updatePhone(newPhone: string) {
    this._updatePhone(newPhone);

    this._phone = newPhone;
    this._touch();
  }

  private _touch() {
    this._updatedAt = new Date();
  }

  private validate() {
    if (!this.isValidEmail(this._email)) {
      throw new ValidationError(`Invlaid email: ${this._email}`);
    }

    if (this._name.trim() === "") {
      throw new ValidationError("Supplier name cannot be empty.");
    }

    if (this._phone.trim() === "") {
      throw new ValidationError("Supplier phone number cannot be empty.");
    }

    if (this._description.trim() === "") {
      throw new ValidationError("Supplier description cannot be empty.");
    }

    if (this._address.trim() === "") {
      throw new ValidationError("Supplier address cannot be empty.");
    }

    if (this._state.trim() === "") {
      throw new ValidationError("Supplier state cannot be empty.");
    }

    if (this._country.trim() === "") {
      throw new ValidationError("Supplier country cannot be empty.");
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Factory for new supplier
  static createFromDTO(dto: CreateSupplierInput): SupplierModel {
    return new SupplierModel(
      "", // ID to be assigned by persistence
      "", // public_id to be assigned by persistence
      dto.name,
      dto.email,
      dto.address,
      dto.description,
      dto.phone,
      dto.state,
      dto.country,
      null,
      null
    );
  }

  // Factory for suppliers loaded from DB
  static rebuildFromPersistence(data: any): SupplierModel {
    return new SupplierModel(
      data.id,
      data.public_id,
      data.name,
      data.email,
      data.address,
      data.description,
      data.phone,
      data.state,
      data.country,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this._id,
      public_id: this._public_id,
      name: this._name,
      email: this._email,
      address: this._address,
      description: this._description,
      phone: this._phone,
      statue: this._state,
      country: this._country,
      createdAt: this._createdAt,
      updateAt: this._updatedAt,
    };
  }

  toPersistence(): Pick<
    SupplierModel,
    "name" | "email" | "address" | "description" | "phone" | "country" | "state"
  > {
    return {
      name: this._name,
      email: this._email,
      address: this._address,
      description: this._description,
      phone: this._phone,
      state: this._state,
      country: this._country,
    };
  }

  mergeUpdate(data: Partial<CreateSupplierArgs>) {
    if (data.name !== undefined) {
      if (data.name.trim() === "") {
        throw new ValidationError(`Name cannot be empty`);
      }

      this._name = data.name;
    }

    if (data.email !== undefined) {
      this._updateEmail(data.email);
      this._email = data.email;
    }

    if (data.phone !== undefined) {
      this._updatePhone(data.phone);
      this._phone = data.phone;
    }

    if (data.description !== undefined) {
      this._description = data.description;
    }

    if (data.address !== undefined) {
      this._address = data.address;
    }

    this._touch();
  }
}
