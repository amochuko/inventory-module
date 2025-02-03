import "reflect-metadata";
import { testkit } from "graphql-modules";
import { userModule } from "../user.module";

describe("userModule", () => {
  it("has QueryType", () => {
    const app = testkit.testModule(userModule, {
      replaceExtensions: true,
    });

    expect(app.schema.getQueryType()).toBeDefined();
  });
});
