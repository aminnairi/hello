import z from "zod";
import { createLocalStorageState } from "@aminnairi/react-signal";

export const useModeState = createLocalStorageState({
  key: "mode",
  fallback: "dark",
  parse: value => z.union([
    z.literal("dark"),
    z.literal("light"),
    z.literal("auto"),
  ]).parse(value),
});
