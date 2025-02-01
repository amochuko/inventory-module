import { gql } from "graphql-modules";

export const UserSchema = gql`
  type Query {
  "The user type"
    user(id: ID!): User
  }

  type User {
    "Indentifier of the User"
    id: ID!
    "Name of the user"
    username: String!
  }
`;
