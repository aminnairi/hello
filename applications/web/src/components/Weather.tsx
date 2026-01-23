import { Fragment, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { Button, Card, CardActions, CardContent, CardHeader, Skeleton, Stack, Typography, Zoom } from "@mui/material";
import { Opacity, Speed, Thermostat } from "@mui/icons-material";

export const Weather = () => {
  const { weather, getWeather, weatherLoading } = useWeather();

  useEffect(() => {
    getWeather();
  }, [getWeather])

  return (
    <Fragment>
      {weatherLoading ? (
        <Card>
          <CardContent>
            <Stack spacing={3} paddingBottom={3}>
              <Skeleton variant="text" width="100px" />
              <Stack spacing={3} justifyContent="center" alignItems="center" direction="row">
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Thermostat />
                  <Skeleton variant="text" width="50px" />
                </Stack>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Opacity />
                  <Skeleton variant="text" width="50px" />
                </Stack>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Speed />
                  <Skeleton variant="text" width="50px" />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ) : weather && (
        <Zoom appear in={true}>
          <Card>
            <CardHeader title={weather.description} />
            <CardContent>
              <Stack spacing={3} justifyContent="center" alignItems="center" direction="row">
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Thermostat />
                  <Typography variant="body1" align="center">
                    {weather.temperature}°C
                  </Typography>
                </Stack>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Opacity />
                  <Typography variant="body1" align="center">
                    {weather.humidity} %
                  </Typography>
                </Stack>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Speed />
                  <Typography variant="body1" align="center">
                    {weather.pressure} hPa
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions>
              <Button onClick={() => window.open(`https://openweathermap.org/city/${weather.identifier}`)}>
                Details
              </Button>
            </CardActions>
          </Card>
        </Zoom>
      )}
    </Fragment>
  );
};
