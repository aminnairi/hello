import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
import { request } from "./rpc";
import { AppBar, Container, createTheme, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Toolbar, Typography, type PaletteMode } from "@mui/material";
import type { Applications } from "@hello/server/schema";
import { DarkMode, LightMode, OpenInNew, Public, Search, ShowChart, Menu, Code, Favorite, Close } from "@mui/icons-material";
import type { Cryptos } from "@hello/server/schema"
import { ThemeProvider } from "@emotion/react";

function App() {
  const [applications, setApplications] = useState<Applications>([]);
  const [cryptos, setCryptos] = useState<Cryptos>([]);
  const [mode, setMode] = useState<PaletteMode>(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const theme = useMemo(() => {
    console.log(mode);
    return createTheme({
      palette: {
        mode,
      }
    })
  }, [mode]);

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

  useEffect(() => {
    request("getApplications", null).then(response => {
      if (response instanceof Error) {
        throw new Error
      }

      setApplications(response.applications);
    })
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
    if (search.trim().length === 0) {
      setSearchOpened(false);
    } else {
      setSearch("");
    }
  }, [search]);

  useEffect(() => {
    request("getCryptos", null).then(response => {
      if (response instanceof Error) {
        throw new Error
      }

      setCryptos(response);
    });
  }, []);

  useEffect(() => {
    if (searchOpened) {
      searchRef.current?.focus();
    }
  }, [searchOpened]);

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
                        <IconButton>
                          <Search sx={{ color: theme.palette.common.white }} />
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
        <Drawer open={drawerOpened} onClose={onDrawerClose}>
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
        <Stack paddingTop="80px">
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
                  <ListItemIcon>
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
                  <ListItemIcon>
                    <OpenInNew />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </ThemeProvider>
    </Container>
  )
}

export default App
