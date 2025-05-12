import { Application, gql, testkit } from "graphql-modules";
import { Category } from "../../../generated-types/graphql";
import { categoryModule } from "../category.module";

type Result = { createCategory: Category };

describe("Testing categoryModule", () => {
  let app: Application;

  beforeEach(() => {
    app = testkit.testModule(categoryModule, { replaceExtensions: true });
  });

  test("schema is definded", () => {
    const queryType = app.schema.getQueryType();

    expect(queryType).toBeDefined();
  });

  it("should create a category and list it", async () => {
    const createResult = await testkit.execute(app, {
      document: gql`
        mutation CreateCategory($input: CategoryCreateInput!) {
          createCategory(argsObj: $input) {
            success
            message
            category {
              id
              name
            }
          }
        }
      `,
      variableValues: {
        input: {
          name: "Books",
          description: "The books for all",
        },
      },
    });

    const createdCategory = createResult.data!.createCategory;

    expect(createResult.errors).toBeUndefined();
    expect(createdCategory?.category.name).toBe("Books");

    const queryResult = await testkit.execute(app, {
      document: gql`
        query GetCategories($filter: CategoryFilterInput) {
          categories {
            id
            name
          }
        }
      `,
      variableValues: {
        filter: {},
      },
    });

    expect(queryResult.errors).toBeUndefined();
    expect(queryResult.data!.categories.length).toBe(1);
    expect(queryResult.data!.categories).toEqual([
      {
        id: createdCategory?.category.id,
        name: "Books",
      },
    ]);
  });
});
