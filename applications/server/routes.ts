import { createHTTPRoutes } from "@aminnairi/rpc";
import { getCryptos } from "./routes/getCryptos";
import { getApplications } from "./routes/getApplications";
import { getWeather } from "./routes/getWeather";

export const routes = createHTTPRoutes({
  getApplications,
  getCryptos,
  getWeather,
});
