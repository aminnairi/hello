import { createHTTPRoute } from "@aminnairi/rpc";
import { healthcheckInputSchema } from "./input";
import { healthcheckOutputSchema } from "./output";

export const [healthcheck, implementHealthcheck] = createHTTPRoute({
  parseInput: input => {
    return healthcheckInputSchema.parse(input);
  },
  parseOutput: output => {
    return healthcheckOutputSchema.parse(output);
  },
});
