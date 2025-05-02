export class CategoryModel {
  //   id: ID!;
  //   "The name of the category";
  //   name: String!;
  //   "The code to represent the category";
  //   abbrev_code: String!;
  //   "The description of the category";
  //   description: String!;
  //   "Represent the date the category was created";
  //   created_at: Date!;
  //   "Represent the date the category was updated";
  //   updated_at: Date;

  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get abbrevCode() {
    return this._getAbbrevationCodeFromName(this._name);
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private _getAbbrevationCodeFromName(name: string) {
    const nameArr = name.split(" ");

    return nameArr.length > 1
      ? nameArr
          .map((n) => n.substring(0, 1))
          .join("")
          .substring(0, 3)
          .toUpperCase() +
          "-" +
          name.length
      : name.substring(0, 3).toUpperCase() + "-" + name.length;
  }
}
