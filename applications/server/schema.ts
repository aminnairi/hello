import z from "zod";

export const cryptoSchema = z.object({
  symbol: z.string(),
  price: z.coerce.number(),
});

export const cryptosSchema = z.array(cryptoSchema);

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
export type Cryptos = z.infer<typeof cryptosSchema>;
