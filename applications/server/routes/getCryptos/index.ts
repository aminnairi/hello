import { createHTTPRoute } from "@aminnairi/rpc";
import { getCryptosOutputSchema } from "./output";
import { getCryptosInputSchema } from "./input";

export const [getCryptos, implementGetCryptos] = createHTTPRoute({
  parseInput: input => {
    return getCryptosInputSchema.parse(input);
  },
  parseOutput: output => {
    return getCryptosOutputSchema.parse(output);
  }
});
