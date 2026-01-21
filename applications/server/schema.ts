import z from "zod";

export const authenticationSettingSchema = z.object({
  userName: z.string({ error: "it should be a string" }),
  hashedPassword: z.string({ error: "it should be a string" }),
  jsonWebTokenSecret: z.string({ error: "it should be a string" }),
}, { error: "it should be an object" }).optional();

export const applicationsSettingsSchema = z.array(z.object({
  name: z.string({ error: "it should be a string" }),
  url: z.url({ error: "it should be a valid URL" }),
}, { error: "it should be an object" }), { error: "it should be an array" });

export const settingsCryptoSchema = z.array(z.object({
  name: z.string({ error: "it should be a string" }),
  ticker: z.string({ error: "it should be a string" }),
}, { error: "it should be an object" }), { error: "it should be an array" });

export const openweathermapSettingsSchema = z.object({
  apiKey: z.string({ error: "it should be a string" }),
  city: z.string({ error: "it should be a string" }),
  language: z.string({ error: "it should be a string" }),
}, { error: "it should be an object" }).optional();

export const settingsSchema = z.object({
  authentication: authenticationSettingSchema,
  applications: applicationsSettingsSchema,
  crypto: settingsCryptoSchema,
  openweathermap: openweathermapSettingsSchema,
}, { error: "it should be an object" });

export type Applications = z.infer<typeof applicationsSettingsSchema>;
export type Settings = z.infer<typeof settingsSchema>;
