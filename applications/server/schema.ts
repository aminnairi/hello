import z from "zod";

export const applicationsSettingsSchema = z.array(z.object({
  name: z.string(),
  url: z.string(),
}));

export const settingsCryptoSchema = z.array(z.object({
  name: z.string(),
  ticker: z.string(),
}));

export const openweathermapSettingsSchema = z.object({
  apiKey: z.string(),
  city: z.string(),
  language: z.string(),
}).optional();

export const settingsSchema = z.object({
  applications: applicationsSettingsSchema,
  crypto: settingsCryptoSchema,
  openweathermap: openweathermapSettingsSchema,
});

export type Applications = z.infer<typeof applicationsSettingsSchema>;
export type Settings = z.infer<typeof settingsSchema>;
