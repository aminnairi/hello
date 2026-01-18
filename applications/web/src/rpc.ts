import { createHTTPRequest } from "@aminnairi/rpc-web";
import { routes } from "@hello/server/routes";

export const request = createHTTPRequest({
  routes,
  url: "http://localhost:8000"
});
