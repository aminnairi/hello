import z from "zod";

export const cryptoSchema = z.object({
  symbol: z.string(),
  price: z.coerce.number(),
});

export const cryptosSchema = z.array(cryptoSchema);

export const applicationsSchema = z.array(z.object({
  identifier: z.string(),
  name: z.string(),
  url: z.string(),
}));

export const settingsCryptoSchema = z.array(z.object({
  identifier: z.string(),
  name: z.string(),
  ticker: z.string(),
}));

export const settingsSchema = z.object({
  applications: applicationsSchema,
  crypto: settingsCryptoSchema,
});

export type Applications = z.infer<typeof applicationsSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type Cryptos = z.infer<typeof cryptosSchema>;
