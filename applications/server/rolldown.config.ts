import { defineConfig } from "rolldown";
import run from "@rollup/plugin-run";
import nodeExternals from "rollup-plugin-node-externals";

const isProduction = process.env["PRODUCTION"] ? true : false

export default defineConfig({
  input: "index.ts",
  plugins: [
    nodeExternals(),
    isProduction && run(),
  ],
  output: {
    file: "dist/index.js",
  },
});
