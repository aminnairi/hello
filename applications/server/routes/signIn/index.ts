import { createHTTPRoute } from "@aminnairi/rpc";
import { signInOutputSchema } from "./output";
import { signInInputSchema } from "./input";

export const [signIn, implementSignIn] = createHTTPRoute({
  parseInput: input => {
    return signInInputSchema.parse(input);
  },
  parseOutput: output => {
    return signInOutputSchema.parse(output);
  }
});
