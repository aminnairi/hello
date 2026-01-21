import z from "zod";

export const getCryptosInputSchema = z.object({
  token: z.string(),
});
