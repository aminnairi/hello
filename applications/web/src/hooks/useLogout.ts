import { useCallback } from "react";
import { useToken } from "./useToken";
import { useApplications } from "./useApplications";
import { useCryptos } from "./useCryptos";
import { useWeather } from "./useWeather";

export const useLogout = () => {
  const { clearToken } = useToken();
  const { clearApplications } = useApplications();
  const { clearCryptos } = useCryptos();
  const { clearWeather } = useWeather();

  const logout = useCallback(() => {
    clearToken();
    clearApplications();
    clearCryptos();
    clearWeather();
  }, [clearApplications, clearCryptos, clearToken, clearWeather]);

  return {
    logout,
  };
};
