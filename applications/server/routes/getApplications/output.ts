import z from "zod";

export const applicationSchema = z.array(z.object({
  identifier: z.string(),
  name: z.string(),
  url: z.string(),
}));

export const getApplicationsOutputSchema = z.union([
  z.object({
    success: z.literal(true),
    applications: applicationSchema,
  }),
  z.object({
    success: z.literal(false),
    error: z.literal("Unauthenticated"),
  }),
]);

export type Applications = z.infer<typeof applicationSchema>;
