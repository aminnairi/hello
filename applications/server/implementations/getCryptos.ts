import { implementGetCryptos } from "../routes";
import { cryptosSchema } from "../schema";
import { settings } from "../settings";

export const getCryptos = implementGetCryptos(async () => {
  const symbols = settings.crypto.map(crypto => `"${crypto.ticker}USDT"`).join(",");
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbols=[${symbols}]`);
  const data = await response.json();
  const value = cryptosSchema.parse(data);

  return value;
});
