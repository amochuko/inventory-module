import { Application, testkit } from "graphql-modules";
import { productModule } from "../product.module";

describe("Testing productModule", () => {
  let app: Application;

  beforeEach(() => {
    app = testkit.testModule(productModule, {});
  });

  test("schema is definded", () => {
    expect(app.schema.getQueryType()).toBeDefined();
  });
});
