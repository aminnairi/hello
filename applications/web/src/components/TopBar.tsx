import { Fragment, useCallback, useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { AppBar, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useToken } from "../hooks/useToken";
import { useMode } from "../hooks/useMode";
import { useSearch } from "../hooks/useSearch";
import { useDrawer } from "../hooks/useDrawer";
import { useApplications } from "../hooks/useApplications";
import { ArrowBack, BrightnessAuto, Close, DarkMode, LightMode, Logout, Search, Menu, Wifi, WifiOff } from "@mui/icons-material";
import { useCryptos } from "../hooks/useCryptos";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "../hooks/useTheme";
import { useNotification } from "../hooks/useNotification";
import { Weather } from "./Weather";
import { useVibration } from "../hooks/useVibration";

export const TopBar = () => {
  const [offline, setOffline] = useState(false);
  const { clearToken } = useToken();
  const { mode, toggleMode } = useMode();
  const { searchOpened, setSearch, search, clearSearch, openSearch, closeSearch, searchRef } = useSearch();
  const { openDrawer } = useDrawer();
  const { filteredApplications, clearApplications } = useApplications();
  const { filteredCryptos, clearCryptos } = useCryptos();
  const { clearWeather } = useWeather();
  const { theme } = useTheme();
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { withRegularVibration } = useVibration();

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
                    <Tooltip title="Clearn">
                      <IconButton onClick={withRegularVibration(onCloseEndAdornmentClick)}>
                        <Close sx={{ color: theme.palette.common.white }} />
                      </IconButton>
                    </Tooltip>
                  ),
                  startAdornment: (
                    <Tooltip title="Cancel">
                      <IconButton onClick={withRegularVibration(onArrowLeftIconButtonClick)}>
                        <ArrowBack sx={{ color: theme.palette.common.white }} />
                      </IconButton>
                    </Tooltip>
                  )
                }
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Tooltip title="About">
              <IconButton onClick={withRegularVibration(onMenuIconButtonClick)}>
                <Menu sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" flex="1" onClick={onTitleClick} sx={{ cursor: "pointer" }}>
              Hello
            </Typography>
            <Weather />
            <Tooltip title="Connectivity">
              <IconButton>
                {offline ? (
                  <WifiOff sx={{ color: theme.palette.common.white }} />
                ) : (
                  <Wifi sx={{ color: theme.palette.common.white }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={withRegularVibration(onLogoutButtonClick)}>
                <Logout sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search">
              <IconButton onClick={withRegularVibration(onSearchIconButtonClick)}>
                <Search sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle">
              <IconButton onClick={withRegularVibration(onModeIconButtonClick)}>
                {mode === "light"
                  ? <LightMode sx={{ color: theme.palette.common.white }} />
                  : mode === "dark"
                    ? <DarkMode sx={{ color: theme.palette.common.white }} />
                    : <BrightnessAuto sx={{ color: theme.palette.common.white }} />}
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
