import z from "zod";
import { implementGetWeather } from "../routes";
import { settings } from "../settings";

export const getWeather = implementGetWeather(async () => {
  if (!settings.openweathermap) {
    return {
      success: false,
    };
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${settings.openweathermap.city}&appid=${settings.openweathermap.apiKey}&units=metric&lang=${settings.openweathermap.language}`);
  const json = await response.json();

  const schema = z.object({
    weather: z.array(z.object({
      main: z.string(),
      description: z.string(),
    })),
    main: z.object({
      temp: z.number(),
      pressure: z.number(),
      humidity: z.number(),
    }),
  });

  const validation = schema.safeParse(json);

  if (!validation.success) {
    return {
      success: false,
    };
  }

  const weather = validation.data.weather.at(0);

  if (!weather) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    weather: {
      description: weather.description,
      humidity: validation.data.main.humidity,
      main: weather.main,
      pressure: validation.data.main.pressure,
      temperature: validation.data.main.temp,
    },
  };
});
