import { createLocalStorageState } from "@aminnairi/react-signal";
import { useCallback } from "react";
import z from "zod";

export const useTokenState = createLocalStorageState({
  fallback: "",
  key: "token",
  parse: value => z.string().parse(value),
});

export const useToken = () => {
  const [token, setToken] = useTokenState();

  const clearToken = useCallback(() => {
    setToken("");
  }, [setToken]);

  return {
    token,
    setToken,
    clearToken,
  };
};
