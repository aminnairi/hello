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

export const weatherSchema = z.object({
  main: z.string(),
  description: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  pressure: z.number(),
});

export type Weather = z.infer<typeof weatherSchema>;

export const [getWeather, implementGetWeather] = createHTTPRoute({
  parseInput: input => {
    return z.null().parse(input);
  },
  parseOutput: output => {
    return z.union([
      z.object({
        success: z.literal(false),
      }),
      z.object({
        success: z.literal(true),
        weather: weatherSchema,
      }),
    ]).parse(output);
  }
});

export const routes = createHTTPRoutes({
  getApplications,
  getCryptos,
  getWeather,
});
