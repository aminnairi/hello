import { defineConfig } from "rolldown";
import run from "@rollup/plugin-run";

export default defineConfig({
  input: "index.ts",
  plugins: [
    run(),
  ],
  output: {
    file: "dist/index.js",
  },
});
