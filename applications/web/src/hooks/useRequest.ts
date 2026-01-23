import { createHTTPRequest } from "@aminnairi/rpc-web";
import { routes } from "@hello/server/routes";
import { useMemo } from "react";

export const useRequest = () => {
  const request = useMemo(() => createHTTPRequest({
    routes,
    url: "/api"
  }), []);

  return {
    request,
  };
};
