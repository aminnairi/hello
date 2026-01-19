import { Fragment, startTransition, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react"
import { AppBar, Backdrop, Button, Card, CardActions, CardContent, CardHeader, Container, createTheme, CssBaseline, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Toolbar, Typography, type PaletteMode } from "@mui/material";
import type { Applications } from "@hello/server/schema";
import { DarkMode, LightMode, OpenInNew, Public, Search, ShowChart, Menu, Code, Favorite, Close, Settings, ArrowBack } from "@mui/icons-material";
import type { Cryptos } from "@hello/server/schema"
import { ThemeProvider } from "@emotion/react";
import { createHTTPRequest } from "@aminnairi/rpc-web";
import { routes } from "@hello/server/routes";


function App() {
  const [applications, setApplications] = useState<Applications>([]);
  const [cryptos, setCryptos] = useState<Cryptos>([]);
  const [mode, setMode] = useState<PaletteMode>(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [settingsModalOpened, setSettingsModalOpened] = useState(false);
  const [remoteUrl, setRemoteUrl] = useState("");
  const [speedDialOpened, setSpeedDialOpened] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const request = useMemo(() => createHTTPRequest({
    routes,
    url: remoteUrl
  }), [remoteUrl]);

  const theme = useMemo(() => {
    if (mode === "light") {
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#6366f1', // Indigo moderne
            light: '#818cf8',
            dark: '#4f46e5',
          },
          secondary: {
            main: '#10b981', // Émeraude
          },
          background: {
            default: '#f8fafc', // Gris très clair (Slate 50)
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b', // Slate 800
            secondary: '#64748b',
          },
        },
        shape: {
          borderRadius: 12, // Coins arrondis pour un look moderne
        },
      });
    }

    return createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#818cf8', // Indigo plus clair pour le mode sombre
        },
        secondary: {
          main: '#34d399',
        },
        background: {
          default: '#0f172a', // Slate 900 (Bleu nuit profond)
          paper: '#1e293b',   // Slate 800
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
              backgroundImage: 'none', // Supprime l'overlay gris par défaut de MUI
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

  const onSpeedDialOpened = useCallback(() => {
    setSpeedDialOpened(true);
  }, []);

  const onSpeedDialClosed = useCallback(() => {
    setSpeedDialOpened(false);
  }, []);

  const onSettingsModalClose = useCallback(() => {
    setSettingsModalOpened(false);
  }, []);

  const onSettingsSpeedDialIconClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setSettingsModalOpened(true);
  }, []);

  const onRemoteUrlChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRemoteUrl(event.target.value);
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
    request("getApplications", null).then(response => {
      if (response instanceof Error) {
        throw new Error
      }

      setApplications(response.applications);
    })
  }, [request]);

  useEffect(() => {
    request("getCryptos", null).then(response => {
      if (response instanceof Error) {
        throw new Error
      }

      setCryptos(response);
    });
  }, [request]);

  useEffect(() => {
    if (searchOpened) {
      searchRef.current?.focus();
    }
  }, [searchOpened]);

  useEffect(() => {
    const onWindowKeydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "/") {
        setSearchOpened(true);
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
          {remoteUrl.trim().length === 0 ? (
            <Stack spacing={3} justifyContent="center" alignItems="center" height="80vh">
              <Typography>
                Server URL not set.
              </Typography>
              <Typography align="center">
                <Link onClick={onSettingsSpeedDialIconClick} href="">Open settings</Link> in order to update the server URL.
              </Typography>
            </Stack>
          ) : (
            <List>
              {applications.filter(application => {
                return application.name.toLowerCase().includes(search.toLowerCase());
              }).map(application => (
                <ListItem key={application.identifier}>
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
              <Divider />
              {cryptos.filter(crypto => {
                return crypto.symbol.toLowerCase().includes(search.toLowerCase());
              }).map(crypto => (
                <ListItem key={crypto.symbol}>
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
            </List>
          )}
        </Stack>
        <Modal open={settingsModalOpened} onClose={onSettingsModalClose} slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}>
          <Stack alignItems="center" justifyContent="center" width="100vw" height="100vh">
            <Card>
              <CardHeader title="Settings" />
              <CardContent>
                <TextField
                  label="Server URL"
                  size="small"
                  value={remoteUrl}
                  onChange={onRemoteUrlChange}
                />
              </CardContent>
              <CardActions>
                <Button size="small" variant="text" onClick={() => setSettingsModalOpened(false)}>
                  Close
                </Button>
              </CardActions>
            </Card>
          </Stack>
        </Modal>
        <Backdrop open={speedDialOpened}></Backdrop>
        <SpeedDial
          ariaLabel="Actions"
          sx={{ position: "absolute", bottom: "30px", right: "30px" }}
          icon={<SpeedDialIcon />}
          onOpen={onSpeedDialOpened}
          onClose={onSpeedDialClosed}>
          <SpeedDialAction
            icon={<Settings />}
            onClick={onSettingsSpeedDialIconClick}
          />
        </SpeedDial>
      </ThemeProvider>
    </Container>
  )
}

export default App
