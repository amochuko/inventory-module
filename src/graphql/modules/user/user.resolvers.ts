import { UserModule } from "./generated-types/module-types";

const users = [
  {
    id: "1",
    username: "Jack Sparrow",
    name: "fisher",
  },
  {
    id: "2",
    username: "JD Farmer",
    name: "cyclist",
  },
];

export const userResolvers: UserModule.Resolvers = {
  Query: {
    users: async () => {
      return users;
    },
    user: async (_, args, ctx) => {
      return {
        id: args.id,
        username: users[parseInt(args.id)].username,
      };
    },
  },
  User: {
    id(user) {
      return user.id;
    },
    
    username(user) {
      return user.username;
    },
  },
};
