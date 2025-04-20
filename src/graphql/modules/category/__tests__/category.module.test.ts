import { Application, testkit } from "graphql-modules";
import { categoryModule } from "../category.module";
 

describe("Testing categoryModule", () => {
  let app: Application;

  beforeEach(() => {
    app = testkit.testModule(categoryModule, {});
  });

  test("schema is definded", () => {
    expect(app.schema.getQueryType()).toBeDefined();
  });
});
