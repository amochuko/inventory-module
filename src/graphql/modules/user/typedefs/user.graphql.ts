import { gql } from "graphql-modules";

export const UserSchema = gql`
  type Query {
    "The user type"
    user(id: ID!): User
    users: [User!]!
  }

  type User {
    "Indentifier of the User"
    id: ID!
    "Name of the user"
    name: String
    "Username of the user"
    username: String!
  }
`;
