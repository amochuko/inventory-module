import { gql } from "graphql-modules";

export const supplierSchema = gql`
  scalar Date

  type Query {
    "A list of Supplier"
    suppliers(s_filter_input: SupplierFilterInput): [Supplier!]!
    "A Supplier"
    supplier(id: ID!): Supplier
  }

  type Mutation {
    "Create new supplier"
    createSupplier(s_input: CreateSupplierInput!): SupplierMutationResponse!
    updateSupplier(s_input: UpdateSupplierInput!): SupplierMutationResponse!
    deleteSupplier(id: ID!): SupplierMutationResponse
  }

  """
  Supplier: Create Input
  """
  input CreateSupplierInput {
    name: String!
    description: String!
    address: String!
    email: String!
    phone: String!
    state: String!
    country: String!
  }

  input UpdateSupplierInput {
    id: ID!
    update_input: UpdateSupplier
  }

  input UpdateSupplier {
    name: String
    description: String
    address: String
    email: String
    phone: String
  }

  enum SupplierFilterEnum {
    NAME
    EMAIL
    PHONE
  }

  input SupplierFilterOptionsInput {
    by: SupplierFilterEnum
    term: String
    take: Int
    skip: Int
  }

  # union NAME | EMAIL | PHONE_NUMBER
  """
  Supplier: Filter Input
  """
  input SupplierFilterInput {
    # FilterBy can be 'name', 'email' or phone_number
    filter: SupplierFilterOptionsInput
  }

  """
  Supplier Entity
  """
  type Supplier {
    id: ID!
    "The id for public"
    public_id: ID!
    "The name of the supplier"
    name: String!
    "The email of the supplier"
    email: String!
    "The description of the supplier"
    description: String!
    "The phone number of the supplier"
    phone: String!
    "The address of the supplier"
    address: String!

    "The state of the supplier"
    state: String!

    "The country of the supplier"
    country: String!

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
