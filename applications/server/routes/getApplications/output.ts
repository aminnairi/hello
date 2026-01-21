import z from "zod";

export const applicationSchema = z.array(z.object({
  identifier: z.string(),
  name: z.string(),
  url: z.string(),
}));

export const getApplicationsOutputSchema = z.object({
  applications: applicationSchema,
});

export type Applications = z.infer<typeof applicationSchema>;
