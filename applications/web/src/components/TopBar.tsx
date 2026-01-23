import { Fragment, useCallback, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { AppBar, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useToken } from "../hooks/useToken";
import { useMode } from "../hooks/useMode";
import { useSearch } from "../hooks/useSearch";
import { useDrawer } from "../hooks/useDrawer";
import { useApplications } from "../hooks/useApplications";
import { ArrowBack, BrightnessAuto, Close, DarkMode, LightMode, Logout, Search, Menu } from "@mui/icons-material";
import { useCryptos } from "../hooks/useCryptos";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "../hooks/useTheme";

export const TopBar = () => {
  const { clearToken } = useToken();
  const { mode, toggleMode } = useMode();
  const { searchOpened, setSearch, search, clearSearch, openSearch, closeSearch, searchRef } = useSearch();
  const { openDrawer } = useDrawer();
  const { filteredApplications, clearApplications } = useApplications();
  const { filteredCryptos, clearCryptos } = useCryptos();
  const { clearWeather } = useWeather();
  const { theme } = useTheme();

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
                      <IconButton onClick={withVibration(onCloseEndAdornmentClick)}>
                        <Close sx={{ color: theme.palette.common.white }} />
                      </IconButton>
                    </Tooltip>
                  ),
                  startAdornment: (
                    <Tooltip title="Cancel">
                      <IconButton onClick={withVibration(onArrowLeftIconButtonClick)}>
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
              <IconButton onClick={withVibration(onMenuIconButtonClick)}>
                <Menu sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Typography align="center" variant="h6" flex="1" onClick={onTitleClick} sx={{ cursor: "pointer" }}>
              Hello
            </Typography>
            <Tooltip title="Logout">
              <IconButton onClick={withVibration(onLogoutButtonClick)}>
                <Logout sx={{ clor: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search">
              <IconButton onClick={withVibration(onSearchIconButtonClick)}>
                <Search sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle">
              <IconButton onClick={withVibration(onModeIconButtonClick)}>
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
