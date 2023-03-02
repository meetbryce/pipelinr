/** @type {import("@types/eslint").Linter.BaseConfig} */

module.exports = {
  extends: ["eslint:recommended", "next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  root: true,
};
