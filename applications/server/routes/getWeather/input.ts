import z from "zod";

export const getWeatherInputSchema = z.object({
  token: z.string(),
});
