/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CustomGQLContext } from '../context/custom-gql-context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

/** Category */
export type Category = CommonType & {
  __typename?: 'Category';
  /** The code to represent the category */
  abbrev_code: Scalars['String']['output'];
  /** Represent the date the category was created */
  created_at: Scalars['Date']['output'];
  /** The description of the category */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The name of the category */
  name: Scalars['String']['output'];
  /** Represent the date the category was updated */
  updated_at?: Maybe<Scalars['Date']['output']>;
};

/** Category Add Input */
export type CategoryCreateInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** Category Filter Input */
export type CategoryFilterInput = {
  byName?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoryMutationResponse = MutationResponse & {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** Category Update Input */
export type CategoryUpdateBodyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  changes?: InputMaybe<CategoryUpdateBodyInput>;
  id: Scalars['ID']['input'];
};

export type CommonType = {
  created_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['Date']['output']>;
};

/** Supplier: Create Input */
export type CreateSupplierInput = {
  address: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create new category */
  createCategory: CategoryMutationResponse;
  createProduct: Product;
  /** Create new supplier */
  createSupplier: SupplierMutationResponse;
  /** Delete category */
  deleteCategory?: Maybe<CategoryMutationResponse>;
  deleteProduct: UpdateProductMutationResponse;
  deleteSupplier?: Maybe<SupplierMutationResponse>;
  /** Update category */
  updateCategory: CategoryMutationResponse;
  updateProduct: UpdateProductMutationResponse;
  updateSupplier: SupplierMutationResponse;
};


export type MutationCreateCategoryArgs = {
  argsObj: CategoryCreateInput;
};


export type MutationCreateProductArgs = {
  inputs: ProductInputArgs;
};


export type MutationCreateSupplierArgs = {
  s_input: CreateSupplierInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSupplierArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  args: CategoryUpdateInput;
};


export type MutationUpdateProductArgs = {
  inputs: ProductUpdateInputArgs;
};


export type MutationUpdateSupplierArgs = {
  s_input: UpdateSupplierInput;
};

export type MutationResponse = {
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** Product of the content */
export type Product = {
  __typename?: 'Product';
  barcode_number?: Maybe<Scalars['String']['output']>;
  best_before_date?: Maybe<Scalars['Date']['output']>;
  category_id: Scalars['ID']['output'];
  cost_price: Scalars['Float']['output'];
  created_at: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  manufactured_date?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  qrcode?: Maybe<Scalars['String']['output']>;
  selling_price: Scalars['Float']['output'];
  stock_keeping_unit: Scalars['String']['output'];
  stock_quantity: Scalars['Int']['output'];
  supplier_id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['Date']['output']>;
};

/** Product Input */
export type ProductFilterInputArgs = {
  filterByName?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductInputArgs = {
  barcode_number?: InputMaybe<Scalars['String']['input']>;
  category_id: Scalars['ID']['input'];
  cost_price: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  qrcode?: InputMaybe<Scalars['String']['input']>;
  selling_price: Scalars['Float']['input'];
  stock_keeping_unit: Scalars['String']['input'];
  stock_quantity: Scalars['Int']['input'];
  supplier_id: Scalars['ID']['input'];
};

export type ProductUpdateInputArgs = {
  id: Scalars['ID']['input'];
  product: ProductInputArgs;
};

export type Query = {
  __typename?: 'Query';
  /** A list of Categories */
  categories: Array<Category>;
  category?: Maybe<Category>;
  product?: Maybe<Product>;
  products: Array<Product>;
  /** A Supplier */
  supplier?: Maybe<Supplier>;
  /** A list of Supplier */
  suppliers: Array<Supplier>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilterInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySupplierArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySuppliersArgs = {
  s_filter_input?: InputMaybe<SupplierFilterInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  categoryAdded?: Maybe<Category>;
};

/** Supplier Entity */
export type Supplier = {
  __typename?: 'Supplier';
  /** The address of the supplier */
  address: Scalars['String']['output'];
  /** The country of the supplier */
  country: Scalars['String']['output'];
  /** Represent the date the supplier was created */
  created_at: Scalars['Date']['output'];
  /** The description of the supplier */
  description: Scalars['String']['output'];
  /** The email of the supplier */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The name of the supplier */
  name: Scalars['String']['output'];
  /** The phone number of the supplier */
  phone: Scalars['String']['output'];
  /** The state of the supplier */
  state: Scalars['String']['output'];
  /** Represent the date the supplier was updated */
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type SupplierFilterEnum =
  | 'EMAIL'
  | 'NAME'
  | 'PHONE';

/** Supplier: Filter Input */
export type SupplierFilterInput = {
  filter?: InputMaybe<SupplierFilterOptionsInput>;
};

export type SupplierFilterOptionsInput = {
  by?: InputMaybe<SupplierFilterEnum>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type SupplierMutationResponse = MutationResponse & {
  __typename?: 'SupplierMutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  supplier?: Maybe<Supplier>;
};

export type UpdateProductMutationResponse = {
  __typename?: 'UpdateProductMutationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  product?: Maybe<Product>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSupplier = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSupplierInput = {
  id: Scalars['ID']['input'];
  update_input?: InputMaybe<UpdateSupplier>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  CommonType: ( Category );
  MutationResponse: ( CategoryMutationResponse ) | ( SupplierMutationResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryCreateInput: CategoryCreateInput;
  CategoryFilterInput: CategoryFilterInput;
  CategoryMutationResponse: ResolverTypeWrapper<CategoryMutationResponse>;
  CategoryUpdateBodyInput: CategoryUpdateBodyInput;
  CategoryUpdateInput: CategoryUpdateInput;
  CommonType: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CommonType']>;
  CreateSupplierInput: CreateSupplierInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Product: ResolverTypeWrapper<Product>;
  ProductFilterInputArgs: ProductFilterInputArgs;
  ProductInputArgs: ProductInputArgs;
  ProductUpdateInputArgs: ProductUpdateInputArgs;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Supplier: ResolverTypeWrapper<Supplier>;
  SupplierFilterEnum: SupplierFilterEnum;
  SupplierFilterInput: SupplierFilterInput;
  SupplierFilterOptionsInput: SupplierFilterOptionsInput;
  SupplierMutationResponse: ResolverTypeWrapper<SupplierMutationResponse>;
  UpdateProductMutationResponse: ResolverTypeWrapper<UpdateProductMutationResponse>;
  UpdateSupplier: UpdateSupplier;
  UpdateSupplierInput: UpdateSupplierInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryCreateInput: CategoryCreateInput;
  CategoryFilterInput: CategoryFilterInput;
  CategoryMutationResponse: CategoryMutationResponse;
  CategoryUpdateBodyInput: CategoryUpdateBodyInput;
  CategoryUpdateInput: CategoryUpdateInput;
  CommonType: ResolversInterfaceTypes<ResolversParentTypes>['CommonType'];
  CreateSupplierInput: CreateSupplierInput;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  Product: Product;
  ProductFilterInputArgs: ProductFilterInputArgs;
  ProductInputArgs: ProductInputArgs;
  ProductUpdateInputArgs: ProductUpdateInputArgs;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Supplier: Supplier;
  SupplierFilterInput: SupplierFilterInput;
  SupplierFilterOptionsInput: SupplierFilterOptionsInput;
  SupplierMutationResponse: SupplierMutationResponse;
  UpdateProductMutationResponse: UpdateProductMutationResponse;
  UpdateSupplier: UpdateSupplier;
  UpdateSupplierInput: UpdateSupplierInput;
};

export type CategoryResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  abbrev_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['CategoryMutationResponse'] = ResolversParentTypes['CategoryMutationResponse']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommonTypeResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['CommonType'] = ResolversParentTypes['CommonType']> = {
  __resolveType: TypeResolveFn<'Category', ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['CategoryMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'argsObj'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'inputs'>>;
  createSupplier?: Resolver<ResolversTypes['SupplierMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateSupplierArgs, 's_input'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['CategoryMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteProduct?: Resolver<ResolversTypes['UpdateProductMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteSupplier?: Resolver<Maybe<ResolversTypes['SupplierMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteSupplierArgs, 'id'>>;
  updateCategory?: Resolver<ResolversTypes['CategoryMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'args'>>;
  updateProduct?: Resolver<ResolversTypes['UpdateProductMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'inputs'>>;
  updateSupplier?: Resolver<ResolversTypes['SupplierMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateSupplierArgs, 's_input'>>;
};

export type MutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'CategoryMutationResponse' | 'SupplierMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  barcode_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  best_before_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  category_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cost_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manufactured_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qrcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  selling_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stock_keeping_unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stock_quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  supplier_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  supplier?: Resolver<Maybe<ResolversTypes['Supplier']>, ParentType, ContextType, RequireFields<QuerySupplierArgs, 'id'>>;
  suppliers?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType, Partial<QuerySuppliersArgs>>;
};

export type SubscriptionResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  categoryAdded?: SubscriptionResolver<Maybe<ResolversTypes['Category']>, "categoryAdded", ParentType, ContextType>;
};

export type SupplierResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Supplier'] = ResolversParentTypes['Supplier']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupplierMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['SupplierMutationResponse'] = ResolversParentTypes['SupplierMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  supplier?: Resolver<Maybe<ResolversTypes['Supplier']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProductMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['UpdateProductMutationResponse'] = ResolversParentTypes['UpdateProductMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomGQLContext> = {
  Category?: CategoryResolvers<ContextType>;
  CategoryMutationResponse?: CategoryMutationResponseResolvers<ContextType>;
  CommonType?: CommonTypeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
  SupplierMutationResponse?: SupplierMutationResponseResolvers<ContextType>;
  UpdateProductMutationResponse?: UpdateProductMutationResponseResolvers<ContextType>;
};


export type Date = Scalars["Date"];