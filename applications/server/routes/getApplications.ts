import { createHTTPRoute } from "@aminnairi/rpc";
import z from "zod";
import { applicationsSettingsSchema } from "../schema";

export const [getApplications, implementGetApplications] = createHTTPRoute({
  parseInput: input => {
    return z.null().parse(input);
  },
  parseOutput: output => {
    return z.object({
      applications: applicationsSettingsSchema,
    }).parse(output);
  }
});
