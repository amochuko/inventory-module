/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace SupplierModule {
  interface DefinedFields {
    Query: 'suppliers' | 'supplier';
    Mutation: 'createSupplier';
    Supplier: 'id' | 'name' | 'email' | 'description' | 'phone' | 'created_at' | 'updated_at';
    SupplierMutationResponse: 'code' | 'success' | 'message' | 'supplier';
    MutationResponse: 'code' | 'success' | 'message';
  };
  
  interface DefinedInputFields {
    CreateSupplierInput: 'name' | 'description' | 'email' | 'phone';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Supplier = Pick<Types.Supplier, DefinedFields['Supplier']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type SupplierMutationResponse = Pick<Types.SupplierMutationResponse, DefinedFields['SupplierMutationResponse']>;
  export type CreateSupplierInput = Pick<Types.CreateSupplierInput, DefinedInputFields['CreateSupplierInput']>;
  export type Date = Types.Date;
  export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SupplierResolvers = Pick<Types.SupplierResolvers, DefinedFields['Supplier'] | '__isTypeOf'>;
  export type SupplierMutationResponseResolvers = Pick<Types.SupplierMutationResponseResolvers, DefinedFields['SupplierMutationResponse'] | '__isTypeOf'>;
  export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Supplier?: SupplierResolvers;
    SupplierMutationResponse?: SupplierMutationResponseResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      suppliers?: gm.Middleware[];
      supplier?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createSupplier?: gm.Middleware[];
    };
    Supplier?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      email?: gm.Middleware[];
      description?: gm.Middleware[];
      phone?: gm.Middleware[];
      created_at?: gm.Middleware[];
      updated_at?: gm.Middleware[];
    };
    SupplierMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      supplier?: gm.Middleware[];
    };
  };
}