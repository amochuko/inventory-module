import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const cleanedBrowserGlobals = Object.fromEntries(Object.entries(globals.browser).map(([key, value]) => [key.trim(), value]))

export default [
  { languageOptions: { globals: cleanedBrowserGlobals } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    ignores: ["node_modules", "dist", "**/__tests__/**"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
