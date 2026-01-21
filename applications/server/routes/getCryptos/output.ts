import z from "zod";

export const cryptoSchema = z.object({
  symbol: z.string(),
  price: z.coerce.number(),
});

export const cryptosSchema = z.array(cryptoSchema);

export const getCryptosOutputSchema = z.union([
  z.object({
    success: z.literal(true),
    cryptos: cryptosSchema,
  }),
  z.object({
    success: z.literal(false),
    error: z.literal("Unauthenticated"),
  }),
]);

export type Cryptos = z.infer<typeof cryptosSchema>;

