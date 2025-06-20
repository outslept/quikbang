import { sxzz } from "@sxzz/eslint-config";
import svelte from 'eslint-plugin-svelte';

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
);
