import { createState } from "@aminnairi/react-signal";
import type { Cryptos } from "@hello/server/routes/getCryptos/output";

export const useCryptosState = createState<Cryptos>([]);
