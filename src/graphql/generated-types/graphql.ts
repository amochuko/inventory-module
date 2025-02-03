/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../context/graphqlContext';
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
};

/** A character from the Star Wars universe */
export type Character = Node & {
  __typename?: 'Character';
  /** The age of the character */
  age: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The episode featured on */
  episode?: Maybe<Episode>;
  /** The id of the character. */
  id: Scalars['ID']['output'];
  /** The name of the character. */
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** The  comment type */
export type Comment = Node & {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  feed: Feed;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** An interface that describes dates */
export type Dates = {
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** The episodes in the Stars Wars trilogy */
export type Episode =
  | 'EMPIRE'
  | 'JEDI'
  | 'NEWHOPE';

/** This the Feed object */
export type Feed = Node & {
  __typename?: 'Feed';
  /** The comments of a Feed */
  comments: Array<Comment>;
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The description of the Feed */
  description: Scalars['String']['output'];
  /** The identifier of the Feed */
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** The url of the Feed */
  url: Scalars['String']['output'];
};

/** Message type */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

/** The mutation is take state changing function of the schema */
export type Mutation = {
  __typename?: 'Mutation';
  /** This add comment of a Feed */
  postCommentOnFeed: Comment;
  /** This is the function called to create a new feed */
  postFeed: Feed;
  sendMessage: Message;
};


/** The mutation is take state changing function of the schema */
export type MutationPostCommentOnFeedArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  feedId: Scalars['ID']['input'];
};


/** The mutation is take state changing function of the schema */
export type MutationPostFeedArgs = {
  description: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


/** The mutation is take state changing function of the schema */
export type MutationSendMessageArgs = {
  msg: Scalars['String']['input'];
};

/** An interface that describes the Node */
export type Node = {
  /** A unique identifier of the node */
  id: Scalars['ID']['output'];
};

/** The query type, represents all of the entry points into our object graph */
export type Query = {
  __typename?: 'Query';
  /** The comment for a feed */
  comment?: Maybe<Comment>;
  /** This is the Feed to different websites */
  feed: Array<Feed>;
  /** Fetches the hero of a specified Star Wars film */
  hero?: Maybe<Character>;
  /** Info is of a String scalar */
  info: Scalars['String']['output'];
  /** Get list of messages */
  messages?: Maybe<Array<Message>>;
  /** The user type */
  user?: Maybe<User>;
  users: Array<User>;
};


/** The query type, represents all of the entry points into our object graph */
export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


/** The query type, represents all of the entry points into our object graph */
export type QueryFeedArgs = {
  filterNeedle?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The query type, represents all of the entry points into our object graph */
export type QueryHeroArgs = {
  episode?: InputMaybe<Episode>;
};


/** The query type, represents all of the entry points into our object graph */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  countdown?: Maybe<Scalars['Int']['output']>;
  messageAdded?: Maybe<Message>;
};


export type SubscriptionCountdownArgs = {
  from: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  bestFriend?: Maybe<User>;
  /** Indentifier of the User */
  id: Scalars['ID']['output'];
  /** Name of the user */
  name?: Maybe<Scalars['String']['output']>;
  /** Username of the user */
  username: Scalars['String']['output'];
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
  Dates: never;
  Node: ( Character ) | ( Comment ) | ( Feed );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<Character>;
  Comment: ResolverTypeWrapper<Comment>;
  Dates: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Dates']>;
  Episode: Episode;
  Feed: ResolverTypeWrapper<Feed>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Character: Character;
  Comment: Comment;
  Dates: ResolversInterfaceTypes<ResolversParentTypes>['Dates'];
  Feed: Feed;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Message: Message;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  User: User;
};

export type CharacterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Dates'] = ResolversParentTypes['Dates']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type FeedResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  postCommentOnFeed?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationPostCommentOnFeedArgs, 'feedId'>>;
  postFeed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, RequireFields<MutationPostFeedArgs, 'description' | 'url'>>;
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'msg'>>;
};

export type NodeResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Character' | 'Comment' | 'Feed', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>;
  feed?: Resolver<Array<ResolversTypes['Feed']>, ParentType, ContextType, Partial<QueryFeedArgs>>;
  hero?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, Partial<QueryHeroArgs>>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  countdown?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "countdown", ParentType, ContextType, RequireFields<SubscriptionCountdownArgs, 'from'>>;
  messageAdded?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageAdded", ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bestFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Character?: CharacterResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Dates?: DatesResolvers<ContextType>;
  Feed?: FeedResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

