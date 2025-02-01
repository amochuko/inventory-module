import { testkit } from "graphql-modules";
import "reflect-metadata";
import { userModule } from "..";

describe("userModule", () => {
  it("has QueryType", () => {
    const app = testkit.testModule(userModule, {
      replaceExtensions: true,
    });

    expect(app.schema.getQueryType()).toBeDefined();
  });
});
