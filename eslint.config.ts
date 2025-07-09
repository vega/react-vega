import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactBase from "eslint-plugin-react";

const pluginReact = pluginReactBase.configs.flat.recommended;

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginReact,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
