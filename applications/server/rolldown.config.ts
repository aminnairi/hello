import { defineConfig } from "rolldown";
import run from "@rollup/plugin-run";
import nodeExternals from "rollup-plugin-node-externals";

const isDevelopment = !!process.env["ROLLUP_WATCH"];

console.log(process.env);

export default defineConfig({
  input: "index.ts",
  plugins: [
    nodeExternals(),
    isDevelopment && run(),
  ],
  output: {
    file: "dist/index.js",
  },
});
