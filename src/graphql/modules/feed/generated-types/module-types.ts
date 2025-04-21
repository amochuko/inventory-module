/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace FeedModule {
  interface DefinedFields {
    Query: 'feed' | 'link' | 'comment';
    Mutation: 'postLink' | 'updateLink' | 'postCommentOnLink';
    Link: 'feed_id' | 'url' | 'description' | 'comments' | 'createdAt' | 'updatedAt';
    Comment: 'id' | 'body' | 'link' | 'createdAt' | 'updatedAt';
    PostCommentOnLinkMutationResponse: 'code' | 'success' | 'message' | 'comment';
    UpdateLinkMutationResponse: 'code' | 'success' | 'message' | 'link';
    CommonType: 'id' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedInputFields {
    FeedInputArgs: 'filterNeedle' | 'skip' | 'take';
    FeedUpdateInputArgs: 'url' | 'description';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Link = Pick<Types.Link, DefinedFields['Link']>;
  export type FeedInputArgs = Pick<Types.FeedInputArgs, DefinedInputFields['FeedInputArgs']>;
  export type Comment = Pick<Types.Comment, DefinedFields['Comment']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type UpdateLinkMutationResponse = Pick<Types.UpdateLinkMutationResponse, DefinedFields['UpdateLinkMutationResponse']>;
  export type FeedUpdateInputArgs = Pick<Types.FeedUpdateInputArgs, DefinedInputFields['FeedUpdateInputArgs']>;
  export type PostCommentOnLinkMutationResponse = Pick<Types.PostCommentOnLinkMutationResponse, DefinedFields['PostCommentOnLinkMutationResponse']>;
  export type CommonType = Pick<Types.CommonType, DefinedFields['CommonType']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type LinkResolvers = Pick<Types.LinkResolvers, DefinedFields['Link'] | '__isTypeOf'>;
  export type CommentResolvers = Pick<Types.CommentResolvers, DefinedFields['Comment'] | '__isTypeOf'>;
  export type PostCommentOnLinkMutationResponseResolvers = Pick<Types.PostCommentOnLinkMutationResponseResolvers, DefinedFields['PostCommentOnLinkMutationResponse'] | '__isTypeOf'>;
  export type UpdateLinkMutationResponseResolvers = Pick<Types.UpdateLinkMutationResponseResolvers, DefinedFields['UpdateLinkMutationResponse'] | '__isTypeOf'>;
  export type CommonTypeResolvers = Pick<Types.CommonTypeResolvers, DefinedFields['CommonType']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Link?: LinkResolvers;
    Comment?: CommentResolvers;
    PostCommentOnLinkMutationResponse?: PostCommentOnLinkMutationResponseResolvers;
    UpdateLinkMutationResponse?: UpdateLinkMutationResponseResolvers;
    Date?: Types.Resolvers['Date'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      feed?: gm.Middleware[];
      link?: gm.Middleware[];
      comment?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      postLink?: gm.Middleware[];
      updateLink?: gm.Middleware[];
      postCommentOnLink?: gm.Middleware[];
    };
    Link?: {
      '*'?: gm.Middleware[];
      feed_id?: gm.Middleware[];
      url?: gm.Middleware[];
      description?: gm.Middleware[];
      comments?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Comment?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      body?: gm.Middleware[];
      link?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    PostCommentOnLinkMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      comment?: gm.Middleware[];
    };
    UpdateLinkMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      link?: gm.Middleware[];
    };
  };
}