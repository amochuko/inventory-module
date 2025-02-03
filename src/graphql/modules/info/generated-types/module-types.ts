/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace InfoModule {
  interface DefinedFields {
    Query: 'info' | 'messages';
    Mutation: 'sendMessage';
    Subscription: 'messageAdded';
    Message: 'id' | 'content';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Message = Pick<Types.Message, DefinedFields['Message']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type MessageResolvers = Pick<Types.MessageResolvers, DefinedFields['Message'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Subscription?: SubscriptionResolvers;
    Message?: MessageResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      info?: gm.Middleware[];
      messages?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      sendMessage?: gm.Middleware[];
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      messageAdded?: gm.Middleware[];
    };
    Message?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      content?: gm.Middleware[];
    };
  };
}