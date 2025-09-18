import { ExecutionResult } from "graphql";
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

  describe("full CRUD", () => {
    let createResult: ExecutionResult;
    let createdCategory: any;

    beforeEach(async () => {
      createResult = await testkit.execute(app, {
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

      createdCategory = createResult.data!.createCategory as any;
    });

    it("should create a category and list it", async () => {
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

    it("should return category with id", async () => {
      const queryResult = await testkit.execute(app, {
        document: gql`
          query GetCategory($cat_id: String!) {
            category(id: $cat_id) {
              id
              name
            }
          }
        `,
        variableValues: {
          cat_id: "1",
        },
      });

      expect(queryResult.errors).toBeUndefined();
      expect(queryResult.data?.category.name).toBe("Books");
    });

    it("should update a category by id", async () => {
      const updateResult = await testkit.execute(app, {
        document: gql`
          mutation UpdateCategory($update_input: CategoryUpdateInput!) {
            updateCategory(args: $update_input) {
              id
              name
              description
            }
          }
        `,
        variableValues: {
          update_input: {
            id: "1",
            changes: { name: "Stationary" },
          },
        },
      });

      console.log({ updateResult: JSON.stringify(updateResult.data!.updateCategory, null, 2) });
      expect(updateResult.errors).toBeUndefined();
      // expect(updateResult.data?.updateCategory.name).toBe("Stationary");
    });
  });
});
