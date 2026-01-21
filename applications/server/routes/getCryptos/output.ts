import z from "zod";

export const cryptoSchema = z.object({
  symbol: z.string(),
  price: z.coerce.number(),
});

export const cryptosSchema = z.array(cryptoSchema);

export const getCryptosOutputSchema = z.object({
  success: z.literal(true),
  cryptos: cryptosSchema,
});

export type Cryptos = z.infer<typeof cryptosSchema>;

