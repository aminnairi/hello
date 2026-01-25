import { Fragment, useCallback, useEffect, useMemo, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { AppBar, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useToken } from "../hooks/useToken";
import { useMode } from "../hooks/useMode";
import { useSearch } from "../hooks/useSearch";
import { useDrawer } from "../hooks/useDrawer";
import { useApplications } from "../hooks/useApplications";
import { ArrowBack, BrightnessAuto, Close, DarkMode, LightMode, Logout, Search, Menu, Wifi, WifiOff } from "@mui/icons-material";
import { useCryptos } from "../hooks/useCryptos";
import { useWeather } from "../hooks/useWeather";
import { useNotification } from "../hooks/useNotification";
import { Weather } from "./Weather";
import { useVibration } from "../hooks/useVibration";
import { useScroll } from "../hooks/useScroll";
import { useTheme } from "../hooks/useTheme";

export const TopBar = () => {
  const [offline, setOffline] = useState(false);
  const { clearToken } = useToken();
  const { mode, toggleMode } = useMode();
  const { searchOpened, setSearch, search, clearSearch, openSearch, closeSearch, searchRef } = useSearch();
  const { openDrawer } = useDrawer();
  const { filteredApplications, clearApplications } = useApplications();
  const { filteredCryptos, clearCryptos } = useCryptos();
  const { clearWeather } = useWeather();
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { withRegularVibration } = useVibration();
  const { scrolledTop } = useScroll();
  const { color } = useTheme();

  const appBarElevation = useMemo(() => {
    return scrolledTop ? 0 : 4;
  }, [scrolledTop]);

  const appBarBackground = useMemo(() => {
    return scrolledTop ? "transparent" : undefined;
  }, [scrolledTop]);

  const onSearchKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      clearSearch();
      closeSearch();
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
  }, [clearSearch, closeSearch, filteredApplications, filteredCryptos, search]);

  const onModeIconButtonClick = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  const onSearchIconButtonClick = useCallback(() => {
    openSearch();
  }, [openSearch]);

  const onArrowLeftIconButtonClick = useCallback(() => {
    closeSearch();
    clearSearch();
  }, [clearSearch, closeSearch]);

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, [setSearch]);

  const onMenuIconButtonClick = useCallback(() => {
    openDrawer();
  }, [openDrawer]);

  const onCloseEndAdornmentClick = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const onTitleClick = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, []);

  const onLogoutButtonClick = useCallback(() => {
    clearToken();
    clearApplications();
    clearCryptos();
    clearWeather();
  }, [clearApplications, clearCryptos, clearToken, clearWeather]);

  useEffect(() => {
    if (searchOpened) {
      searchRef.current?.focus();
    }
  }, [searchOpened, searchRef]);

  useEffect(() => {
    const onWindowOnline = () => {
      setOffline(previouslyOffline => {
        if (previouslyOffline) {
          openSuccessNotification("Back online!");
        }

        return false;
      });
    }

    const onWindowOffline = () => {
      openErrorNotification("You are offline");
      setOffline(true);
    };

    window.addEventListener("online", onWindowOnline);
    window.addEventListener("offline", onWindowOffline);

    return () => {
      window.removeEventListener("online", onWindowOnline);
      window.removeEventListener("offline", onWindowOffline);
    };
  }, [openErrorNotification, openSuccessNotification]);

  return (
    <AppBar position="fixed" enableColorOnDark elevation={appBarElevation} sx={{ background: appBarBackground, transition: "all 0.15s ease-in-out" }}>
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
                    color
                  },
                  endAdornment: (
                    <Tooltip title="Clear">
                      <IconButton onClick={withRegularVibration(onCloseEndAdornmentClick)}>
                        <Close sx={{ color }} />
                      </IconButton>
                    </Tooltip>
                  ),
                  startAdornment: (
                    <Tooltip title="Cancel">
                      <IconButton onClick={withRegularVibration(onArrowLeftIconButtonClick)}>
                        <ArrowBack sx={{ color }} />
                      </IconButton>
                    </Tooltip>
                  )
                }
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Tooltip title="Menu (m)">
              <IconButton onClick={withRegularVibration(onMenuIconButtonClick)}>
                <Menu sx={{ color }} />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" flex="1" onClick={withRegularVibration(onTitleClick)} sx={{ cursor: "pointer", color }}>
              Hello
            </Typography>
            <Weather />
            <Tooltip title="Connectivity">
              <IconButton>
                {offline ? (
                  <WifiOff sx={{ color }} />
                ) : (
                  <Wifi sx={{ color }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout (l)">
              <IconButton onClick={withRegularVibration(onLogoutButtonClick)}>
                <Logout sx={{ color }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search (/)">
              <IconButton onClick={withRegularVibration(onSearchIconButtonClick)}>
                <Search sx={{ color }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Theme (t)">
              <IconButton onClick={withRegularVibration(onModeIconButtonClick)}>
                {mode === "light"
                  ? <LightMode sx={{ color }} />
                  : mode === "dark"
                    ? <DarkMode sx={{ color }} />
                    : <BrightnessAuto sx={{ color }} />}
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
