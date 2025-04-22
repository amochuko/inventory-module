import { gql } from "graphql-modules";

export const feedSchema = gql`
  scalar Date

  type Query {
    feed(args: FeedInputArgs): [Link!]!
    link(id: ID!): Link
    comment(id: ID!): Comment
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    updateLink(id: ID!, link: FeedUpdateInputArgs!): UpdateLinkMutationResponse!
    postCommentOnLink(
      linkId: ID!
      body: String
    ): PostCommentOnLinkMutationResponse!
  }

  """
  Feed Input
  """
  input FeedInputArgs {
    filterNeedle: String
    skip: Int
    take: Int
  }

  # Feed Update InputArgs
  input FeedUpdateInputArgs {
    url: String!
    description: String!
  }

  """
  Link of the content
  """
  type Link {
    feed_id: ID!
    url: String!
    description: String!
    comments: [Comment!]!
    created_at: Date!
    updated_at: Date
  }

  type Comment {
    id: ID!
    body: String!
    link: Link!
    created_at: Date!
    updated_at: Date
  }

  extend interface CommonType {
    created_at: Date!
    updated_at: Date
  }

  type PostCommentOnLinkMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment!
  }

  type UpdateLinkMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    link: Link
  }

  # ARGUEMENT_DEFINITION
  # Note: @deprecated arguments _must_ be optional
  directive @withDeprecatedArgs(
    deprecatedArg: String @deprecated(reason: "Use 'newArg'")
    newArg: String
  ) on FIELD
`;
