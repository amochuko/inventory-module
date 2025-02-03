import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/modules/**/typedefs/*.graphql.ts",
  generates: {
    "./src/graphql/modules/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated-types/graphql.ts",
        filename: "generated-types/module-types.ts",
      },
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        contextType: "../context/graphqlContext#GraphQLContext",
      },
    },
  },
  watch: true,
  overwrite: true,
};

export default config;
