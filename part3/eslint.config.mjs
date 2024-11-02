import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    plugins: {
      "@stylistic/js": stylisticPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": 0,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
