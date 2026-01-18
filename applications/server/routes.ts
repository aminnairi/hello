import { createHTTPRoute, createHTTPRoutes } from "@aminnairi/rpc";
import { z } from "zod";
import { applicationsSchema, cryptosSchema } from "./schema";

export const [getApplications, implementGetApplications] = createHTTPRoute({
  parseInput: input => {
    return z.null().parse(input);
  },
  parseOutput: output => {
    return z.object({
      applications: applicationsSchema,
    }).parse(output);
  }
});

export const [getCryptos, implementGetCryptos] = createHTTPRoute({
  parseInput: input => {
    return z.null().parse(input);
  },
  parseOutput: output => {
    return cryptosSchema.parse(output);
  }
});

export const routes = createHTTPRoutes({
  getApplications,
  getCryptos,
});
