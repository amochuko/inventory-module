import { gql } from "graphql-modules";

export const productSchema = gql`
  scalar Date

  type Query {
    products(filter: ProductFilterInputArgs): [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(args: ProductInputArgs!): Product!
    updateProduct(args: ProductUpdateInputArgs!): UpdateProductMutationResponse!
    deleteProduct(id: ID!): UpdateProductMutationResponse!
  }

  # interface IProduct {
  #   barcode_number: String
  #   qrcode: String
  #   name: String!
  #   description: String!
  #   category_id: ID!
  #   supplier_id: ID!
  #   cost_price: Float!
  #   selling_price: Float!
  #   stock_quantity: Int!
  #   stock_keeping_unit: String!
  #   created_at: Date!
  #   updated_at: Date
  # }

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
    created_at: Date!
  }

  """
  Product Input
  """
  input ProductFilterInputArgs {
    filterByName: String
    skip: Int
    take: Int
  }

  input ProductInputArgs implements IProduct {
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


  # extend interface CommonType {
  #   created_at: Date!
  #   updated_at: Date
  # }

  type UpdateProductMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    product: Product
  }
`;
