import { createHTTPRoute } from "@aminnairi/rpc";
import z from "zod";
import { cryptosSchema } from "../schema";

export const [getCryptos, implementGetCryptos] = createHTTPRoute({
  parseInput: input => {
    return z.null().parse(input);
  },
  parseOutput: output => {
    return cryptosSchema.parse(output);
  }
});
