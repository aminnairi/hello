import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { AppBar, Container, createTheme, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, TextField, Toolbar, Typography, type PaletteMode } from "@mui/material";
import type { Applications } from "@hello/server/schema";
import { DarkMode, LightMode, OpenInNew, Public, Search, ShowChart, Menu, Code, Favorite, Close, ArrowBack } from "@mui/icons-material";
import type { Cryptos } from "@hello/server/schema"
import { ThemeProvider } from "@emotion/react";
import { createHTTPRequest } from "@aminnairi/rpc-web";
import { routes } from "@hello/server/routes";

function App() {
  const [applications, setApplications] = useState<Applications>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [cryptos, setCryptos] = useState<Cryptos>([]);
  const [loadingCryptos, setLoadingCryptos] = useState(true);
  const [mode, setMode] = useState<PaletteMode>(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  const onSearchKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSearch("");
      setSearchOpened(false);
    }
  }, []);

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
        event.preventDefault();
        event.stopPropagation();
        setSearchOpened(true);
        setSearch("");
      }
    };

    window.addEventListener("keydown", onWindowKeydown);

    return () => {
      window.removeEventListener("keydown", onWindowKeydown);
    };
  }, []);

  return (
    <Container>
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
                        <IconButton onClick={onCloseEndAdornmentClick}>
                          <Close sx={{ color: theme.palette.common.white }} />
                        </IconButton>
                      ),
                      startAdornment: (
                        <IconButton onClick={onArrowLeftIconButtonClick}>
                          <ArrowBack sx={{ color: theme.palette.common.white }} />
                        </IconButton>
                      )
                    }
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                <IconButton onClick={onMenuIconButtonClick}>
                  <Menu sx={{ color: theme.palette.common.white }} />
                </IconButton>
                <Typography align="center" variant="h6" flex="1">Hello</Typography>
                <IconButton onClick={onSearchIconButtonClick}>
                  <Search sx={{ color: theme.palette.common.white }} />
                </IconButton>
                <IconButton onClick={onModeIconButtonClick}>
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
          </List>
        </Drawer>
        <Stack paddingTop="80px" justifyContent="center" alignItems="center" minHeight="80vh">
          <List>
            {loadingApplications ? (
              <Stack spacing={3} paddingBottom={3}>
                {Array.from(Array(3)).map(() => (
                  <Stack direction="row" minWidth="300px" spacing={3} alignItems="center">
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
              applications.filter(application => {
                return application.name.toLowerCase().includes(search.toLowerCase());
              }).map((application, index) => (
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
              ))
            )}
            {loadingCryptos ? (
              <Stack spacing={3}>
                {Array.from(Array(3)).map(() => (
                  <Stack direction="row" minWidth="300px" spacing={3} alignItems="center">
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
              cryptos.filter(crypto => {
                return crypto.symbol.toLowerCase().includes(search.toLowerCase());
              }).map((crypto, index) => (
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
              ))
            )}
          </List>
        </Stack>
      </ThemeProvider>
    </Container>
  )
}

export default App
