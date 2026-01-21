import z from "zod";

export const signInOutputSchema = z.union([
  z.object({
    success: z.literal(true),
    token: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: z.literal("BadCredentials"),
  }),
]);
