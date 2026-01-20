import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { AppBar, Card, CardContent, CardHeader, Chip, Container, createTheme, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, TextField, Toolbar, Typography, Zoom, type PaletteMode } from "@mui/material";
import type { Applications } from "@hello/server/schema";
import { DarkMode, LightMode, OpenInNew, Public, Search, ShowChart, Menu, Code, Favorite, Close, ArrowBack, BugReport, Thermostat, Opacity, Speed } from "@mui/icons-material";
import type { Cryptos } from "@hello/server/schema"
import { ThemeProvider } from "@emotion/react";
import { createHTTPRequest } from "@aminnairi/rpc-web";
import { routes, type Weather } from "@hello/server/routes";

function App() {
  const [applications, setApplications] = useState<Applications>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [cryptos, setCryptos] = useState<Cryptos>([]);
  const [loadingCryptos, setLoadingCryptos] = useState(true);
  const [mode, setMode] = useState<PaletteMode>(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter(application => {
      return application.name.trim().toLowerCase().split(/\s+/).every(applicationNameWord => {
        return search.trim().toLowerCase().split(/\s+/).some(searchWord => {
          return applicationNameWord.includes(searchWord);
        });
      });
    });
  }, [applications, search]);

  const filteredCryptos = useMemo(() => {
    return cryptos.filter(crypto => {
      return crypto.symbol.trim().toLowerCase().split(/\s+/).every(cryptoNameWord => {
        return search.trim().toLowerCase().split(/\s+/).some(searchWord => {
          return cryptoNameWord.includes(searchWord);
        });
      });
    });
  }, [cryptos, search]);

  const request = useMemo(() => createHTTPRequest({
    routes,
    url: "/api"
  }), []);

  const theme = useMemo(() => {
    if (mode === "light") {
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
          },
          secondary: {
            main: '#10b981',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          },
        },
        shape: {
          borderRadius: 12,
        },
      });
    }

    return createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#818cf8',
        },
        secondary: {
          main: '#34d399',
        },
        background: {
          default: '#0f172a',
          paper: '#1e293b',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    })
  }, [mode]);

  const withVibration = useCallback(<Input, Output>(fn: (...input: Input[]) => Output) => {
    return (...input: Input[]): Output => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      return fn(...input);
    }
  }, []);

  const onSearchKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSearch("");
      setSearchOpened(false);
      return;
    }

    if (event.key === "Enter") {
      const application = filteredApplications.at(0);

      if (application) {
        window.open(application.url);
        return;
      }

      const crypto = filteredCryptos.at(0);

      if (crypto) {
        window.open(`https://www.binance.com/fr/trade/${crypto.symbol}`);
        return;
      }

      window.open(`https://google.com/search?q=${search}`);
    }
  }, [filteredApplications, filteredCryptos, search]);

  const onArrowLeftIconButtonClick = useCallback(() => {
    setSearchOpened(false);
    setSearch("");
  }, []);

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onApplicationListItemButtonClicked = useCallback((url: string) => () => {
    window.open(url);
  }, []);

  const onModeIconButtonClick = useCallback(() => {
    setMode(previousMode => {
      if (previousMode === "light") {
        return "dark";
      }

      return "light";
    });
  }, []);

  const onSearchIconButtonClick = useCallback(() => {
    setSearchOpened(true);
  }, []);

  const onCryptoListItemButtonClicked = useCallback((symbol: string) => () => {
    window.open(`https://www.binance.com/fr/trade/${symbol}`);
  }, []);

  const onMenuIconButtonClick = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setDrawerOpened(false);
  }, []);

  const onCloseEndAdornmentClick = useCallback(() => {
    setSearch("");
  }, []);

  const openSearchEngine = useCallback(() => {
    window.open(`https://google.com/search?q=${search}`);
  }, [search]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 1_000)).then(() => {
      request("getApplications", null).then(response => {
        if (response instanceof Error) {
          throw new Error
        }

        setApplications(response.applications);
      }).finally(() => {
        setLoadingApplications(false);
      });
    });
  }, [request]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 1_000)).then(() => {
      request("getCryptos", null).then(response => {
        if (response instanceof Error) {
          throw new Error
        }

        setCryptos(response);
      }).finally(() => {
        setLoadingCryptos(false);
      });
    })
  }, [request]);

  useEffect(() => {
    if (searchOpened) {
      searchRef.current?.focus();
    }
  }, [searchOpened]);

  useEffect(() => {
    const onWindowKeydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "/") {
        if (searchRef.current === document.activeElement) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (searchOpened) {
          searchRef.current?.focus();
          return;
        }

        setSearchOpened(true);
        setSearch("");
        return;
      }
    };

    window.addEventListener("keydown", onWindowKeydown);

    return () => {
      window.removeEventListener("keydown", onWindowKeydown);
    };
  }, [searchOpened]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      request("getWeather", null).then(response => {
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
  }, [request]);

  useEffect(() => {
    const intervalIdentifier = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalIdentifier);
    };
  }, []);

  return (
    <Container maxWidth="xs">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            {searchOpened ? (
              <Fragment>
                <TextField
                  type="text"
                  variant="standard"
                  placeholder="Ex: Google, BTC, Uptime, ..."
                  value={search}
                  onChange={onSearchChange}
                  onKeyDown={onSearchKeydown}
                  inputRef={searchRef}
                  sx={{ flex: 1 }}
                  slotProps={{
                    input: {
                      sx: {
                        color: theme.palette.common.white
                      },
                      endAdornment: (
                        <IconButton onClick={withVibration(onCloseEndAdornmentClick)}>
                          <Close sx={{ color: theme.palette.common.white }} />
                        </IconButton>
                      ),
                      startAdornment: (
                        <IconButton onClick={withVibration(onArrowLeftIconButtonClick)}>
                          <ArrowBack sx={{ color: theme.palette.common.white }} />
                        </IconButton>
                      )
                    }
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                <IconButton onClick={withVibration(onMenuIconButtonClick)}>
                  <Menu sx={{ color: theme.palette.common.white }} />
                </IconButton>
                <Typography align="center" variant="h6" flex="1">Hello</Typography>
                <IconButton onClick={withVibration(onSearchIconButtonClick)}>
                  <Search sx={{ color: theme.palette.common.white }} />
                </IconButton>
                <IconButton onClick={withVibration(onModeIconButtonClick)}>
                  {mode === "light" ? <LightMode sx={{ color: theme.palette.common.white }} /> : <DarkMode sx={{ color: theme.palette.common.white }} />}
                </IconButton>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpened} onClose={onDrawerClose} slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}>
          <Toolbar>
            <Typography align="center" variant="h6" flex="1">Hello</Typography>
          </Toolbar>
          <List sx={{ width: "300px" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello/stargazers")}>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="aminnairi/hello" secondary="Give a star" />
                <ListItemIcon>
                  <OpenInNew />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello")}>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="aminnairi/hello" secondary="Source Code" />
                <ListItemIcon>
                  <OpenInNew />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello/issues")}>
                <ListItemIcon>
                  <BugReport />
                </ListItemIcon>
                <ListItemText primary="aminnairi/hello" secondary="Fill a bug report" />
                <ListItemIcon>
                  <OpenInNew />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Stack paddingTop="80px" justifyContent="center" minHeight="80vh" spacing={3}>
          <Zoom appear in={true}>
            <Card>
              <CardContent>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                  <Typography variant="body1" align="center">
                    {new Intl.DateTimeFormat("fr-FR", { timeStyle: "medium" }).format(date)}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(date)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Zoom>
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
                        {weather.humidity} mm³
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
              </Card>
            </Zoom>
          )}
          <Card>
            <CardContent>
              <Zoom appear in={true}>
                <List>
                  {loadingApplications ? (
                    <Stack spacing={3} paddingBottom={3}>
                      {Array.from(Array(3)).map((_, index) => (
                        <Stack direction="row" minWidth="300px" spacing={3} alignItems="center" key={index}>
                          <Skeleton variant="circular" width="40px" height="40px" />
                          <Stack flex="1">
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                          </Stack>
                          <Skeleton variant="rectangular" height="40px" width="40px" />
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Zoom appear in={true}>
                      <Stack>
                        {filteredApplications.map((application, index) => (
                          <ListItem key={index}>
                            <ListItemButton onClick={onApplicationListItemButtonClicked(application.url)}>
                              <ListItemIcon>
                                <Public />
                              </ListItemIcon>
                              <ListItemText primary={application.name} secondary={new URL(application.url).host} />
                              <ListItemIcon sx={{ paddingLeft: 3 }}>
                                <OpenInNew />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Stack>
                    </Zoom>
                  )}
                  {loadingCryptos ? (
                    <Stack spacing={3}>
                      {Array.from(Array(3)).map((_, index) => (
                        <Stack direction="row" minWidth="300px" spacing={3} alignItems="center" key={index}>
                          <Skeleton variant="circular" width="40px" height="40px" />
                          <Stack flex="1">
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                          </Stack>
                          <Skeleton variant="rectangular" height="40px" width="40px" />
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Zoom appear in={true}>
                      <Stack>
                        {filteredCryptos.map((crypto, index) => (
                          <ListItem key={index}>
                            <ListItemButton onClick={onCryptoListItemButtonClicked(crypto.symbol)}>
                              <ListItemIcon>
                                <ShowChart />
                              </ListItemIcon>
                              <ListItemText primary={crypto.symbol} secondary={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(crypto.price)} />
                              <ListItemIcon sx={{ paddingLeft: 3 }}>
                                <OpenInNew />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Stack>
                    </Zoom>
                  )}
                  {searchOpened && [...filteredApplications, ...filteredCryptos].length === 0 && (
                    <Typography align="center" variant="body1">
                      Type <Chip label="Enter" onClick={openSearchEngine} /> to search for « {search} » using Google.
                    </Typography>
                  )}
                </List>
              </Zoom>
            </CardContent>
          </Card>
        </Stack>
      </ThemeProvider>
    </Container>
  )
}

export default App
