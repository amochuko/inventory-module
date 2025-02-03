import { createModule } from "graphql-modules";
import { userResolvers } from "./user.resolvers";
import { UserSchema } from "./typedefs/user.graphql";

export const userModule = createModule({
  id: "userModule",
  dirname: "import.meta.dirname",
  typeDefs: [UserSchema],
  resolvers: [userResolvers],
});
