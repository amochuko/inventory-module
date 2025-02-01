import { gql } from "graphql-modules";

//   ${cacheControlDirective}
export const FeedSchema = gql`
  # Setting uo cache for schema element

  "The query type, represents all of the entry points into our object graph"
  type Query {
    # Getting a cookie
    cookie(name: String): String

    "This is the Feed to different websites"
    feed(filterNeedle: String, skip: Int, take: Int): [Feed!]!

    "The comment for a feed"
    comment(id: ID!): Comment

    "Fetches the hero of a specified Star Wars film"
    hero(
      "The name of the film that the hero appears in"
      episode: Episode
    ): Character

    "User type"
    user: User

    "Testing Response Cache"
    slow: String
  }

  """
  The mutation is take state changing function of the schema
  """
  type Mutation {
    # setting a cookie
    setCookie(name: String, value: String): String

    "This is the function called to create a new feed"
    postFeed(
      "The url of the feed"
      url: String!
      "The description of the feed"
      description: String!
    ): Feed!

    "This add comment of a Feed"
    postCommentOnFeed(feedId: ID!, body: String): Comment!
  }

  "An interface that describes the Node"
  interface Node {
    "A unique identifier of the node"
    id: ID!
  }

  """
  An interface that describes dates
  """
  interface Dates {
    createdAt: String
    updatedAt: String
  }

  """
  A character from the Star Wars universe
  """
  type Character implements Node {
    "The id of the character."
    id: ID!
    "The name of the character."
    name: String!
    "The age of the character"
    age: Int!
    "The episode featured on"
    episode: Episode
    createdAt: String
    updatedAt: String
  }

  """
  The episodes in the Stars Wars trilogy
  """
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }

  "The  comment type"
  type Comment implements Node {
    id: ID!
    createdAt: String
    updatedAt: String
    body: String
    feed: Feed!
  }

  "This the Feed object"
  type Feed implements Node {
    "The identifier of the Feed"
    id: ID!
    "The description of the Feed"
    description: String!
    "The url of the Feed"
    url: String!
    "The comments of a Feed"
    comments: [Comment!]!
    createdAt: String
    updatedAt: String
  }

  # cache query operations containing 'User' for 10 seconds
  #   type User @cacheControl(maxAge: 10000) { //TODO: review how to enable @cacheControl
  type User {
    id: ID!
    name: String
    bestFriend: User
  }

  type Subscription {
    countdown(from: Int!): Int
  }
`;
