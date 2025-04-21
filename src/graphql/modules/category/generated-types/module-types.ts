/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace CategoryModule {
  interface DefinedFields {
    Query: 'categories' | 'category';
    Mutation: 'createCategory' | 'updateCategory';
    Subscription: 'categoryAdded';
    Category: 'id' | 'name' | 'abbrevCode' | 'description' | 'createdAt' | 'updatedAt';
    CategoryMutationResponse: 'code' | 'success' | 'message' | 'category';
    CommonType: 'id' | 'createdAt' | 'updatedAt';
    MutationResponse: 'code' | 'success' | 'message';
  };
  
  interface DefinedInputFields {
    FilterCategoryInput: 'filterNeedle' | 'skip' | 'take';
    CreateCategoryInput: 'name' | 'description';
    UpdateCategoryInput: 'name' | 'description';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Category = Pick<Types.Category, DefinedFields['Category']>;
  export type FilterCategoryInput = Pick<Types.FilterCategoryInput, DefinedInputFields['FilterCategoryInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type CategoryMutationResponse = Pick<Types.CategoryMutationResponse, DefinedFields['CategoryMutationResponse']>;
  export type CreateCategoryInput = Pick<Types.CreateCategoryInput, DefinedInputFields['CreateCategoryInput']>;
  export type UpdateCategoryInput = Pick<Types.UpdateCategoryInput, DefinedInputFields['UpdateCategoryInput']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
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
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      categoryAdded?: gm.Middleware[];
    };
    Category?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      abbrevCode?: gm.Middleware[];
      description?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
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