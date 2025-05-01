import { gql } from "graphql-modules";

export const productSchema = gql`
  scalar Date

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(inputs: ProductInputArgs!): Product!
    updateProduct(
      inputs: ProductUpdateInputArgs!
    ): UpdateProductMutationResponse!
    deleteProduct(id: ID!): UpdateProductMutationResponse!
  }

  """
  Product of the content
  """
  type Product {
    id: ID!
    barcode_number: String
    qrcode: String
    name: String!
    description: String!
    category_id: ID!
    supplier_id: ID!
    cost_price: Float!
    selling_price: Float!
    stock_quantity: Int!
    stock_keeping_unit: String!
    manufactured_date: Date
    best_before_date: Date
    created_at: Date!
    updated_at: Date
  }

  """
  Product Input
  """
  input ProductFilterInputArgs {
    filterByName: String
    skip: Int
    take: Int
  }

  input ProductInputArgs {
    barcode_number: String
    qrcode: String
    name: String!
    description: String!
    category_id: ID!
    supplier_id: ID!
    cost_price: Float!
    selling_price: Float!
    stock_quantity: Int!
    stock_keeping_unit: String!
  }

  # Product Update InputArgs
  input ProductUpdateInputArgs {
    id: ID!
    product: ProductInputArgs!
  }

  type UpdateProductMutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    product: Product
  }
`;
