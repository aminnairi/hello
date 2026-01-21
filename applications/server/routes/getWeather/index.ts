import { createHTTPRoute } from "@aminnairi/rpc";
import { getWeatherOutputSchema } from "./output";
import { getWeatherInputSchema } from "./input";

export const [getWeather, implementGetWeather] = createHTTPRoute({
  parseInput: input => {
    return getWeatherInputSchema.parse(input);
  },
  parseOutput: output => {
    return getWeatherOutputSchema.parse(output);
  }
});
