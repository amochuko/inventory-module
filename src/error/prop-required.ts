import ValidationError from "./validation-error";

export default class PropertyRequiredError extends ValidationError {
  property: string;

  constructor(prop: string) {
    super("No property: " + prop);
    this.name = PropertyRequiredError.name;
    this.property = prop;
  }
}
