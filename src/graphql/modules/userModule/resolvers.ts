export const userResolvers = {
  Query: {
    user: async (_:unknown, args:{id:number}, ctx: GraphQLModules.Context) => {
      return {
        id: args.id,
        username: "John Doe",
      };
    },
  },
  User: {
    id(user: { id: number }) {
      return user.id;
    },
    username(user: { username: string }) {
      return user.username;
    },
  },
};
