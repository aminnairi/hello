import { createLocalStorageState } from "@aminnairi/react-signal";
import z from "zod";

export const useFilterState = createLocalStorageState({
  key: "filters",
  fallback: {
    applications: true,
    cryptos: true,
  },
  parse: value => {
    return z.object({
      applications: z.boolean(),
      cryptos: z.boolean(),
    }).parse(value);
  },
});
