import { createHTTPServer } from "@aminnairi/rpc-node";
import { routes } from "./routes";
import { getCryptos } from "./implementations/getCryptos";
import { getWeather } from "./implementations/getWeather";
import { getApplications } from "./implementations/getApplication";
import { signIn } from "./implementations/signIn";

const server = createHTTPServer({
  routes,
  implementations: {
    getApplications,
    getCryptos,
    getWeather,
    signIn,
  },
});

server.listen(8000, "0.0.0.0", () => {
  console.log(`HTTP server listening on http://0.0.0.0:8000`);
});
