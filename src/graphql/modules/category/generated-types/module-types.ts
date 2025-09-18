/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace CategoryModule {
  interface DefinedFields {
    Query: 'categories' | 'category';
    Mutation: 'createCategory' | 'updateCategory' | 'deleteCategory';
    Subscription: 'categoryAdded';
    Category: 'id' | 'name' | 'abbrev_code' | 'description' | 'created_at' | 'updated_at';
    CategoryMutationResponse: 'code' | 'success' | 'message' | 'category';
    CommonType: 'id' | 'created_at' | 'updated_at';
    MutationResponse: 'code' | 'success' | 'message';
  };
  
  interface DefinedInputFields {
    CategoryFilterInput: 'byName' | 'skip' | 'take';
    CategoryCreateInput: 'name' | 'description';
    CategoryUpdateInput: 'id' | 'changes';
    CategoryUpdateBodyInput: 'name' | 'description';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Category = Pick<Types.Category, DefinedFields['Category']>;
  export type CategoryFilterInput = Pick<Types.CategoryFilterInput, DefinedInputFields['CategoryFilterInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type CategoryMutationResponse = Pick<Types.CategoryMutationResponse, DefinedFields['CategoryMutationResponse']>;
  export type CategoryCreateInput = Pick<Types.CategoryCreateInput, DefinedInputFields['CategoryCreateInput']>;
  export type CategoryUpdateInput = Pick<Types.CategoryUpdateInput, DefinedInputFields['CategoryUpdateInput']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  export type CategoryUpdateBodyInput = Pick<Types.CategoryUpdateBodyInput, DefinedInputFields['CategoryUpdateBodyInput']>;
  export type CommonType = Pick<Types.CommonType, DefinedFields['CommonType']>;
  export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;
  
  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type CategoryResolvers = Pick<Types.CategoryResolvers, DefinedFields['Category'] | '__isTypeOf'>;
  export type CategoryMutationResponseResolvers = Pick<Types.CategoryMutationResponseResolvers, DefinedFields['CategoryMutationResponse'] | '__isTypeOf'>;
  export type CommonTypeResolvers = Pick<Types.CommonTypeResolvers, DefinedFields['CommonType']>;
  export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Subscription?: SubscriptionResolvers;
    Category?: CategoryResolvers;
    CategoryMutationResponse?: CategoryMutationResponseResolvers;
    Date?: Types.Resolvers['Date'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      categories?: gm.Middleware[];
      category?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createCategory?: gm.Middleware[];
      updateCategory?: gm.Middleware[];
      deleteCategory?: gm.Middleware[];
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      categoryAdded?: gm.Middleware[];
    };
    Category?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      abbrev_code?: gm.Middleware[];
      description?: gm.Middleware[];
      created_at?: gm.Middleware[];
      updated_at?: gm.Middleware[];
    };
    CategoryMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      category?: gm.Middleware[];
    };
  };
}