import { checkAuthentication } from "../functions/checkAuthentication";
import { implementGetCryptos } from "../routes/getCryptos";
import { cryptosSchema } from "../routes/getCryptos/output";
import { settings } from "../settings";

export const getCryptos = implementGetCryptos(async ({ token }) => {
  const authenticationError = await checkAuthentication(settings, token);

  if (authenticationError instanceof Error) {
    return {
      success: false,
      error: "Unauthenticated",
    };
  }

  const symbols = settings.cryptos.map(crypto => `"${crypto.ticker}USDT"`).join(",");
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbols=[${symbols}]`);
  const data = await response.json();
  const value = cryptosSchema.parse(data);

  return {
    success: true,
    cryptos: value.map(crypto => {
      return {
        symbol: crypto.symbol,
        price: crypto.price,
      };
    }),
  };
});
