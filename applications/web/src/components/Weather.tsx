import { Fragment, useCallback, useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Modal, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { Opacity, Speed, Thermostat } from "@mui/icons-material";
import { useTheme } from "../hooks/useTheme";
import { useVibration } from "../hooks/useVibration";

export const Weather = () => {
  const { weather, getWeather, weatherLoading } = useWeather();
  const { withRegularVibration } = useVibration();
  const [weatherModalOpened, setWeatherModalOpened] = useState(false);
  const { color } = useTheme();

  const openWeatherModal = useCallback(() => {
    setWeatherModalOpened(true);
  }, []);

  const closeWeatherModal = useCallback(() => {
    setWeatherModalOpened(false);
  }, []);

  useEffect(() => {
    getWeather();
  }, [getWeather])

  if (weatherLoading) {
    return null;
  }

  return (
    <Fragment>
      <Zoom appear in={true}>
        <Tooltip title="Weather">
          <IconButton onClick={withRegularVibration(openWeatherModal)}>
            <Typography sx={{ color }}>
              {weather.temperature.toFixed(0)} °C
            </Typography>
          </IconButton>
        </Tooltip>
      </Zoom>
      <Modal open={weatherModalOpened} onClose={withRegularVibration(closeWeatherModal)} slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}>
        <Card sx={{ position: "absolute", top: "50%", left: "50%", width: "min(500px, 80vw)", transform: "translate(-50%, -50%)", padding: "10px" }}>
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
          <CardActions sx={{ justifyContent: "right" }}>
            <Button onClick={withRegularVibration(closeWeatherModal)} variant="text" size="small" color="error">
              Close
            </Button>
            <Button onClick={() => window.open(`https://openweathermap.org/city/${weather.identifier}`)} variant="contained" size="small">
              Details
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Fragment>
  );
};
