import { createModule } from "graphql-modules";
import { InfoSchema } from "./info.graphql";


export const userModule = createModule({
  id: "userModule",
  dirname: import.meta.dirname,
  typeDefs: [InfoSchema],
  resolvers: {
    Query: {
      user: async (_, args, ctx) => {
        console.log({ ctx });

        return {
          id: Date.now(),
          username: "John Doe",
        };
      },
    },
  },
});
