import z from "zod";

export const getApplicationsInputSchema = z.object({
  token: z.string(),
});
