import { useCallback, useEffect } from "react"
import { Alert, Chip, Container, CssBaseline, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import { Notification } from "./components/Notification";
import { SignInModalForm } from "./components/SignInModalForm";
import { useApplications } from "./hooks/useApplications";
import { useCryptos } from "./hooks/useCryptos";
import { useSearch } from "./hooks/useSearch";
import { useTheme } from "./hooks/useTheme";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Cryptos } from "./components/Cryptos";
import { Applications } from "./components/Applications";
import { useMode } from "./hooks/useMode";
import { useDrawer } from "./hooks/useDrawer";
import { useToken } from "./hooks/useToken";
import { Filters } from "./components/Filters";
import { useWeather } from "./hooks/useWeather";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { filteredApplications } = useApplications();
  const { filteredCryptos } = useCryptos();
  const { search, searchRef, clearSearch, openSearch, closeSearch, searchOpened } = useSearch();
  const { theme } = useTheme();
  const { toggleMode } = useMode();
  const { toggleDrawer } = useDrawer();
  const { token } = useToken();
  const { toggleWeatherModalOpened } = useWeather();
  const { logout } = useLogout();

  const openSearchEngine = useCallback(() => {
    window.open(`https://google.com/search?q=${search}`);
  }, [search]);

  useEffect(() => {
    const onWindowKeydown = (event: globalThis.KeyboardEvent) => {
      if (token.trim().length === 0) {
        return;
      }

      if (event.key === "l") {
        if (searchOpened) {
          return;
        }

        logout();
        return;
      }

      if (event.key === "w") {
        if (searchOpened) {
          return;
        }

        toggleWeatherModalOpened();
        return;
      }

      if (event.key === "t") {
        if (searchOpened) {
          return;
        }

        toggleMode();
        return;
      }

      if (event.key === "m") {
        if (searchOpened) {
          return;
        }

        toggleDrawer();
        return;
      }

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

        openSearch();
        clearSearch();
        return;
      }

      if (event.key === "Escape") {
        if (searchOpened) {
          clearSearch();
          closeSearch();
          return;
        }

        return;
      }
    };

    window.addEventListener("keydown", onWindowKeydown);

    return () => {
      window.removeEventListener("keydown", onWindowKeydown);
    };
  }, [clearSearch, closeSearch, logout, openSearch, searchOpened, searchRef, toggleDrawer, toggleMode, toggleWeatherModalOpened, token]);

  return (
    <Container sx={{ paddingBottom: "80px" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar />
        <Sidebar />
        <Stack paddingTop="80px" justifyContent="center" minHeight="80vh" spacing={3}>
          <Filters />
          <Cryptos />
          <Applications />
          {searchOpened && [...filteredApplications, ...filteredCryptos].length === 0 && (
            <Alert severity="info">
              Type <Chip icon={<Search />} size="small" label="Enter" onClick={openSearchEngine} clickable /> to search for « {search} » using Google.
            </Alert>
          )}
        </Stack>
        <SignInModalForm />
        <Notification />
      </ThemeProvider>
    </Container>
  )
}

export default App
