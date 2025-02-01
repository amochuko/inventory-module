import { createModule } from "graphql-modules";
import { userResolvers } from "./resolvers";
import { UserSchema } from "./user.graphql";


export const userModule = createModule({
  id: "userModule",
  dirname: 'import.meta.dirname',
  typeDefs: [UserSchema],
  resolvers: [userResolvers],
  // resolvers: {
  //   Query: {
  //     user: async (_, args, ctx) => {
  //       return {
  //         id: Date.now(),
  //         username: "John Doe",
  //       };
  //     },
  //   },
  //   User: {
  //     id(user) {
  //       return user.id;
  //     },
  //     username(user) {
  //       return user.username;
  //     },
  //   },
  // },
});
