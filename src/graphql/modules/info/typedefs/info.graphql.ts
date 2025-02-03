import { gql } from "graphql-modules";

export const InfoSchema = gql`
  type Query {
    "Info is of a String scalar"
    info: String!

    "Get list of messages"
    messages: [Message!]
  }

  type Mutation {
    sendMessage(msg: String!): Message!
  }

  type Subscription {
    messageAdded: Message
  }

  "Message type"
  type Message {
    id: ID!
    content: String!
  }
`;
