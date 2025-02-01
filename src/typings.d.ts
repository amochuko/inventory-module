import { GraphQLContext } from "./graphql/context/graphqlContext";

declare module "graphql-yoga" {
  interface YogaInitialContext extends GraphQLContext {}
}


declare global {
  namespace GraphQLModules {
    interface GlobalContext extends GraphQLContext {}
  }
}