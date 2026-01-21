import { createHTTPRoute } from "@aminnairi/rpc";
import z from "zod";

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
