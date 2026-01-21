import { createHTTPRoute } from "@aminnairi/rpc";
import { getApplicationsInputSchema } from "./input";
import { getApplicationsOutputSchema } from "./output";

export const [getApplications, implementGetApplications] = createHTTPRoute({
  parseInput: input => {
    return getApplicationsInputSchema.parse(input);
  },
  parseOutput: output => {
    return getApplicationsOutputSchema.parse(output);
  }
});
