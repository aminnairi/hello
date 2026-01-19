import z from "zod";

export const environmentSchema = z.object({
  SERVER_WEB_URL: z.string(),
});

export const environment = environmentSchema.parse(process.env);
