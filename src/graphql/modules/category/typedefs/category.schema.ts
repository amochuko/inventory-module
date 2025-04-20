import { gql } from "graphql-modules";

export const categorySchema = gql`
  scalar Date

  type Query {
    categories(filter: FilterCategoryInput): [Category!]!
    category(id: ID!): Category!
  }

  type Mutation {
    addCategory(args: AddCategoryInput): CategoryMutationResponse!
    updateCategory(
      id: ID!
      args: UpdateCategoryInput!
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
  Category
  """
  type Category implements CommonType {
    id: ID!
    name: String!
    code: String!
    description: ID!
    createdAt: Date!
    updatedAt: Date
  }

  """
  Category Add Input
  """
  input AddCategoryInput {
    name: String!
    code: String!
    description: String!
  }

  """
  Category Update Input
  """
  input UpdateCategoryInput {
    name: String
    code: String
    description: String
  }

  interface CommonType {
    id: ID!
    createdAt: Date!
    updatedAt: Date
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CategoryMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    Category: Category!
  }
`;
