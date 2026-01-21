import { createHTTPRoutes } from "@aminnairi/rpc";
import { getCryptos } from "./routes/getCryptos";
import { getApplications } from "./routes/getApplications";
import { getWeather } from "./routes/getWeather";
import { signIn } from "./routes/signIn";

export const routes = createHTTPRoutes({
  getApplications,
  getCryptos,
  getWeather,
  signIn,
});
