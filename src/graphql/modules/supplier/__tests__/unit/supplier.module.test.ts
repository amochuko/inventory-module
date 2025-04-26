import { Application, testkit } from "graphql-modules";
import { supplierModule } from "../../suppiler.module";

describe("Testing supplierModule", () => {
  let app: Application;

  beforeEach(() => {
    app = testkit.testModule(supplierModule, {});
  });

  test("schema is definded", () => {
    expect(app.schema.getQueryType()).toBeDefined();
  });
});
