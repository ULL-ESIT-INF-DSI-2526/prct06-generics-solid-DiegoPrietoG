import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import tsdoc from "eslint-plugin-tsdoc";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    plugins: { tsdoc },
  },
  {rules: { "tsdoc/syntax": "warn" }},
  {ignores: ["dist/**/*", "node_modules/**/*", "eslint.config.mts"]},
]);
