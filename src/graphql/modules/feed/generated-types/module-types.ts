/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace FeedModule {
  interface DefinedFields {
    Query: 'feed' | 'comment' | 'hero' | 'user';
    Mutation: 'postFeed' | 'postCommentOnFeed';
    Character: 'id' | 'name' | 'age' | 'episode' | 'createdAt' | 'updatedAt';
    Comment: 'id' | 'createdAt' | 'updatedAt' | 'body' | 'feed';
    Feed: 'id' | 'description' | 'url' | 'comments' | 'createdAt' | 'updatedAt';
    Subscription: 'countdown';
    User: 'bestFriend';
    Node: 'id';
    Dates: 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    Episode: 'NEWHOPE' | 'EMPIRE' | 'JEDI';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Feed = Pick<Types.Feed, DefinedFields['Feed']>;
  export type Comment = Pick<Types.Comment, DefinedFields['Comment']>;
  export type Character = Pick<Types.Character, DefinedFields['Character']>;
  export type Episode = DefinedEnumValues['Episode'];
  export type User = Types.User;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Node = Pick<Types.Node, DefinedFields['Node']>;
  export type Dates = Pick<Types.Dates, DefinedFields['Dates']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type CharacterResolvers = Pick<Types.CharacterResolvers, DefinedFields['Character'] | '__isTypeOf'>;
  export type CommentResolvers = Pick<Types.CommentResolvers, DefinedFields['Comment'] | '__isTypeOf'>;
  export type FeedResolvers = Pick<Types.FeedResolvers, DefinedFields['Feed'] | '__isTypeOf'>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User']>;
  export type NodeResolvers = Pick<Types.NodeResolvers, DefinedFields['Node']>;
  export type DatesResolvers = Pick<Types.DatesResolvers, DefinedFields['Dates']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Character?: CharacterResolvers;
    Comment?: CommentResolvers;
    Feed?: FeedResolvers;
    Subscription?: SubscriptionResolvers;
    User?: UserResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      feed?: gm.Middleware[];
      comment?: gm.Middleware[];
      hero?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      postFeed?: gm.Middleware[];
      postCommentOnFeed?: gm.Middleware[];
    };
    Character?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      age?: gm.Middleware[];
      episode?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Comment?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
      body?: gm.Middleware[];
      feed?: gm.Middleware[];
    };
    Feed?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      description?: gm.Middleware[];
      url?: gm.Middleware[];
      comments?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      bestFriend?: gm.Middleware[];
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      countdown?: gm.Middleware[];
    };
  };
}