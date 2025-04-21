import { gql } from "graphql-modules";

export const categorySchema = gql`
  scalar Date

  type Query {
    "A list of Categories"
    categories(filter: FilterCategoryInput): [Category!]!
    category(id: ID!): Category!
  }

  type Mutation {
    "Create new category"
    createCategory(argsObj: CreateCategoryInput!): CategoryMutationResponse!
    updateCategory(
      id: ID!
      body: UpdateCategoryInput!
    ): CategoryMutationResponse!
  }

  # Subscription
  type Subscription {
    categoryAdded: Category
  }

  """
  Category Filter Input
  """
  input FilterCategoryInput {
    filterNeedle: String
    skip: Int
    take: Int
  }

  """
  Category Add Input
  """
  input CreateCategoryInput {
    name: String!
    description: String!
  }

  """
  Category
  """
  type Category implements CommonType {
    id: ID!
    "The name of the category"
    name: String!
    "The code to represent the category"
    abbrev_code: String!
    "The description of the category"
    description: String!
    "Represent the date the category was created"
    created_at: Date!
    "Represent the date the category was updated"
    updated_at: Date
  }

  """
  Category Update Input
  """
  input UpdateCategoryInput {
    name: String
    # abbrevCode: String
    description: String
  }

  interface CommonType {
    id: ID!
    created_at: Date!
    updated_at: Date
  }

  interface MutationResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
  }

  type CategoryMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    category: Category
  }
`;
