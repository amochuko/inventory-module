import { GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(val) {
    if (typeof val === "number") {
      return new Date(val);
    }
    throw Error("GraphQL Date Scalar serializer expected a `number`");
  },
  serialize(val) {
    if (val instanceof Date) {
      return val.getTime();
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});
