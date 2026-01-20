import { createHTTPServer } from "@aminnairi/rpc-node";
import { routes } from "./routes";
import { getCryptos } from "./implementations/getCryptos";
import { getWeather } from "./implementations/getWeather";
import { getApplications } from "./implementations/getApplication";

const server = createHTTPServer({
  routes,
  implementations: {
    getApplications,
    getCryptos,
    getWeather,
  },
});

server.listen(8000, "0.0.0.0", () => {
  console.log("server listening");
});
