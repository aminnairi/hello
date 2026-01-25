import { useCallback, useState } from "react";
import { useWeatherState } from "../states/useWeatherState";
import { useRequest } from "./useRequest";
import { useToken } from "./useToken";
import { useWeatherModalOpenedState } from "../states/useWeatherModalOpenedState";

export const useWeather = () => {
  const [weatherModalOpened, setWeatherModalOpened] = useWeatherModalOpenedState();
  const [weather, setWeather] = useWeatherState();
  const [weatherLoading, setWeatherLoading] = useState(true);
  const { request } = useRequest();
  const { token } = useToken();

  const toggleWeatherModalOpened = useCallback(() => {
    setWeatherModalOpened(previouslyOpenedWeatherModal => {
      return !previouslyOpenedWeatherModal;
    });
  }, [setWeatherModalOpened]);

  const clearWeather = useCallback(() => {
    setWeather({
      description: "",
      humidity: 0,
      identifier: 0,
      main: "",
      pressure: 0,
      temperature: 0,
    });
  }, [setWeather]);

  const getWeather = useCallback(() => {
    setWeatherLoading(true);

    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      request("getWeather", {
        token,
      }).then(response => {
        if (response instanceof Error) {
          return;
        }

        if (!response.success) {
          return;
        }

        setWeather(response.weather);
      }).finally(() => {
        setWeatherLoading(false);
      });
    });
  }, [request, setWeather, token]);

  return {
    weather,
    weatherLoading,
    weatherModalOpened,
    setWeatherModalOpened,
    setWeather,
    clearWeather,
    getWeather,
    toggleWeatherModalOpened,
  };
};
