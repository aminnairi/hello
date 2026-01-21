import z from "zod";

export const signInInputSchema = z.object({
  userName: z.string(),
  password: z.string(),
});
