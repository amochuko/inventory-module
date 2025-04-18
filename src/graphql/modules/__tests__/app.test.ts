import { testkit } from "graphql-modules";
import "reflect-metadata";
import { application } from "../app";
import { feedModule } from "../feed/feed.module";

describe("Testing the Application", () => {
  test("Replacing a module", () => {
    const app = testkit.mockApplication(application).replaceModule(
      testkit.mockModule(feedModule, {
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
