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
  abbrevCode: Scalars['String']['output'];
  /** Represent the date the category was created */
  createdAt: Scalars['Date']['output'];
  /** The description of the category */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The name of the category */
  name: Scalars['String']['output'];
  /** Represent the date the category was updated */
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CategoryMutationResponse = MutationResponse & {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  link: Link;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CommonType = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

/** Category Add Input */
export type CreateCategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** Feed Input */
export type FeedInputArgs = {
  filterNeedle?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FeedUpdateInputArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

/** Category Filter Input */
export type FilterCategoryInput = {
  filterNeedle?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Link of the content */
export type Link = {
  __typename?: 'Link';
  comments: Array<Comment>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  feed_id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create new category */
  createCategory: CategoryMutationResponse;
  postCommentOnLink: PostCommentOnLinkMutationResponse;
  postLink: Link;
  updateCategory: CategoryMutationResponse;
  updateLink: UpdateLinkMutationResponse;
};


export type MutationCreateCategoryArgs = {
  argsObj: CreateCategoryInput;
};


export type MutationPostCommentOnLinkArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  linkId: Scalars['ID']['input'];
};


export type MutationPostLinkArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  body: UpdateCategoryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateLinkArgs = {
  id: Scalars['ID']['input'];
  link: FeedUpdateInputArgs;
};

export type MutationResponse = {
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']['output'];
  /** Human-readable message for the UI */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

export type PostCommentOnLinkMutationResponse = MutationResponse & {
  __typename?: 'PostCommentOnLinkMutationResponse';
  code: Scalars['Int']['output'];
  comment: Comment;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** A list of Categories */
  categories: Array<Category>;
  category: Category;
  comment?: Maybe<Comment>;
  feed: Array<Link>;
  link?: Maybe<Link>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<FilterCategoryInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeedArgs = {
  args?: InputMaybe<FeedInputArgs>;
};


export type QueryLinkArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  categoryAdded?: Maybe<Category>;
};

/** Category Update Input */
export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLinkMutationResponse = MutationResponse & {
  __typename?: 'UpdateLinkMutationResponse';
  code: Scalars['Int']['output'];
  link?: Maybe<Link>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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
  MutationResponse: ( CategoryMutationResponse ) | ( PostCommentOnLinkMutationResponse ) | ( UpdateLinkMutationResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryMutationResponse: ResolverTypeWrapper<CategoryMutationResponse>;
  Comment: ResolverTypeWrapper<Comment>;
  CommonType: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CommonType']>;
  CreateCategoryInput: CreateCategoryInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FeedInputArgs: FeedInputArgs;
  FeedUpdateInputArgs: FeedUpdateInputArgs;
  FilterCategoryInput: FilterCategoryInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Link: ResolverTypeWrapper<Link>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  PostCommentOnLinkMutationResponse: ResolverTypeWrapper<PostCommentOnLinkMutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateLinkMutationResponse: ResolverTypeWrapper<UpdateLinkMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryMutationResponse: CategoryMutationResponse;
  Comment: Comment;
  CommonType: ResolversInterfaceTypes<ResolversParentTypes>['CommonType'];
  CreateCategoryInput: CreateCategoryInput;
  Date: Scalars['Date']['output'];
  FeedInputArgs: FeedInputArgs;
  FeedUpdateInputArgs: FeedUpdateInputArgs;
  FilterCategoryInput: FilterCategoryInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Link: Link;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  PostCommentOnLinkMutationResponse: PostCommentOnLinkMutationResponse;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateLinkMutationResponse: UpdateLinkMutationResponse;
};

export type WithDeprecatedArgsDirectiveArgs = {
  deprecatedArg?: Maybe<Scalars['String']['input']>;
  newArg?: Maybe<Scalars['String']['input']>;
};

export type WithDeprecatedArgsDirectiveResolver<Result, Parent, ContextType = CustomGQLContext, Args = WithDeprecatedArgsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CategoryResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  abbrevCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['CategoryMutationResponse'] = ResolversParentTypes['CategoryMutationResponse']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommonTypeResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['CommonType'] = ResolversParentTypes['CommonType']> = {
  __resolveType: TypeResolveFn<'Category', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LinkResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feed_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['CategoryMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'argsObj'>>;
  postCommentOnLink?: Resolver<ResolversTypes['PostCommentOnLinkMutationResponse'], ParentType, ContextType, RequireFields<MutationPostCommentOnLinkArgs, 'linkId'>>;
  postLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationPostLinkArgs, 'description' | 'url'>>;
  updateCategory?: Resolver<ResolversTypes['CategoryMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'body' | 'id'>>;
  updateLink?: Resolver<ResolversTypes['UpdateLinkMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateLinkArgs, 'id' | 'link'>>;
};

export type MutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'CategoryMutationResponse' | 'PostCommentOnLinkMutationResponse' | 'UpdateLinkMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type PostCommentOnLinkMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['PostCommentOnLinkMutationResponse'] = ResolversParentTypes['PostCommentOnLinkMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>;
  feed?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType, Partial<QueryFeedArgs>>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<QueryLinkArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  categoryAdded?: SubscriptionResolver<Maybe<ResolversTypes['Category']>, "categoryAdded", ParentType, ContextType>;
};

export type UpdateLinkMutationResponseResolvers<ContextType = CustomGQLContext, ParentType extends ResolversParentTypes['UpdateLinkMutationResponse'] = ResolversParentTypes['UpdateLinkMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomGQLContext> = {
  Category?: CategoryResolvers<ContextType>;
  CategoryMutationResponse?: CategoryMutationResponseResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommonType?: CommonTypeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Link?: LinkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  PostCommentOnLinkMutationResponse?: PostCommentOnLinkMutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UpdateLinkMutationResponse?: UpdateLinkMutationResponseResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = CustomGQLContext> = {
  withDeprecatedArgs?: WithDeprecatedArgsDirectiveResolver<any, any, ContextType>;
};

export type Date = Scalars["Date"];