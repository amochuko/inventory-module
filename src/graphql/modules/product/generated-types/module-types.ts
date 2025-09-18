/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace ProductModule {
  interface DefinedFields {
    Query: 'products' | 'product';
    Mutation: 'createProduct' | 'updateProduct' | 'deleteProduct';
    Product: 'id' | 'barcode_number' | 'qrcode' | 'name' | 'description' | 'category_id' | 'supplier_id' | 'cost_price' | 'selling_price' | 'stock_quantity' | 'stock_keeping_unit' | 'manufactured_date' | 'best_before_date' | 'created_at' | 'updated_at';
    UpdateProductMutationResponse: 'code' | 'success' | 'message' | 'product';
  };
  
  interface DefinedInputFields {
    ProductFilterInputArgs: 'filterByName' | 'skip' | 'take';
    ProductInputArgs: 'barcode_number' | 'qrcode' | 'name' | 'description' | 'category_id' | 'supplier_id' | 'cost_price' | 'selling_price' | 'stock_quantity' | 'stock_keeping_unit';
    ProductUpdateInputArgs: 'id' | 'product';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Product = Pick<Types.Product, DefinedFields['Product']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type ProductInputArgs = Pick<Types.ProductInputArgs, DefinedInputFields['ProductInputArgs']>;
  export type UpdateProductMutationResponse = Pick<Types.UpdateProductMutationResponse, DefinedFields['UpdateProductMutationResponse']>;
  export type ProductUpdateInputArgs = Pick<Types.ProductUpdateInputArgs, DefinedInputFields['ProductUpdateInputArgs']>;
  export type ProductFilterInputArgs = Pick<Types.ProductFilterInputArgs, DefinedInputFields['ProductFilterInputArgs']>;
  
  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type ProductResolvers = Pick<Types.ProductResolvers, DefinedFields['Product'] | '__isTypeOf'>;
  export type UpdateProductMutationResponseResolvers = Pick<Types.UpdateProductMutationResponseResolvers, DefinedFields['UpdateProductMutationResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Product?: ProductResolvers;
    UpdateProductMutationResponse?: UpdateProductMutationResponseResolvers;
    Date?: Types.Resolvers['Date'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      products?: gm.Middleware[];
      product?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createProduct?: gm.Middleware[];
      updateProduct?: gm.Middleware[];
      deleteProduct?: gm.Middleware[];
    };
    Product?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      barcode_number?: gm.Middleware[];
      qrcode?: gm.Middleware[];
      name?: gm.Middleware[];
      description?: gm.Middleware[];
      category_id?: gm.Middleware[];
      supplier_id?: gm.Middleware[];
      cost_price?: gm.Middleware[];
      selling_price?: gm.Middleware[];
      stock_quantity?: gm.Middleware[];
      stock_keeping_unit?: gm.Middleware[];
      manufactured_date?: gm.Middleware[];
      best_before_date?: gm.Middleware[];
      created_at?: gm.Middleware[];
      updated_at?: gm.Middleware[];
    };
    UpdateProductMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      product?: gm.Middleware[];
    };
  };
}