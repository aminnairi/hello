import { createState } from "@aminnairi/react-signal";
import type { Weather } from "@hello/server/routes/getWeather/output";

export const useWeatherState = createState<Weather>({
  description: "",
  humidity: 0,
  identifier: 0,
  main: "",
  pressure: 0,
  temperature: 0,
});
