import { testkit } from "graphql-modules";
import "reflect-metadata";
import { application } from "../app";
import { productModule } from "../product/product.module";

describe("Testing the Application", () => {
  test("Replacing a module", () => {
    const app = testkit.mockApplication(application).replaceModule(
      testkit.mockModule(productModule, {
        providers: [],
      })
    );

    expect(app.schema.getQueryType()).toBeDefined();
  });

  test("Overwritting App providers", () => {
    const app = testkit.mockApplication(application).addProviders([]);

    expect(app.schema.getQueryType()).toBeDefined();
  });
});
