import { gql } from "graphql-modules";

export const supplierSchema = gql`
  type Query {
    "A list of Categories"
    suppliers: [Supplier!]!
    supplier(id: ID!): Supplier
  }

  type Mutation {
    "Create new supplier"
    createSupplier(args: CreateSupplierInput!): SupplierMutationResponse!
  }

  """
  Supplier Add Input
  """
  input CreateSupplierInput {
    name: String!
    description: String!
    email: String
    phone: String!
  }

  """
  Supplier
  """
  type Supplier {
    id: ID!
    "The name of the supplier"
    name: String!
    "The code to represent the supplier"
    email: String
    "The description of the supplier"
    description: String!
    "The description of the supplier"
    phone: String!
    "Represent the date the supplier was created"
    created_at: Date!
    "Represent the date the supplier was updated"
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

  type SupplierMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    supplier: Supplier
  }
`;
