import { sxzz } from "@sxzz/eslint-config";
import oxlint from 'eslint-plugin-oxlint';

export default sxzz(
  {},
  {
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["data/**/*.json"],
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  ...oxlint.configs['flat/recommended']
);
