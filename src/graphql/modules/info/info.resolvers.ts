import { InfoModule } from "./generated-types/module-types";

export const infoResolvers: InfoModule.Resolvers = {
  Query: {
    messages: (_, __, ctx) => {
      return [];
    },
    info: async (parent, args, ctx, info) => {
      return `Information Logic with DI age of!`;
    },
  },
  Mutation: {},
  Subscription: {},
};
