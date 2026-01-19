import { createHTTPServer } from "@aminnairi/rpc-node";
import { routes, implementGetApplications } from "./routes";
import { settings } from "./settings";
import { getCryptos } from "./implementations/getCryptos";
import { environment } from "./environment";

const server = createHTTPServer({
  routes,
  implementations: {
    getApplications: implementGetApplications(async () => {
      return {
        applications: settings.applications
      }
    }),
    getCryptos,
  },
  allowedOrigins: [
    environment.SERVER_WEB_URL
  ]
});

server.listen(8000, "0.0.0.0", () => {
  console.log("server listening");
});
