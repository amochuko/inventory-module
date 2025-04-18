import { Application, testkit } from "graphql-modules";
import { feedModule } from "../feed.module";

describe("Testing feedModule", () => {
  let app: Application;

  beforeEach(() => {
    app = testkit.testModule(feedModule, {});
  });

  test("schema is definded", () => {
    expect(app.schema.getQueryType()).toBeDefined();
  });
});
