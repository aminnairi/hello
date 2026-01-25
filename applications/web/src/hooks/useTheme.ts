import { createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { useMode } from "./useMode";
import { useScroll } from "./useScroll";

export const useTheme = () => {
  const { mode } = useMode();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { scrolledTop } = useScroll();

  const theme = useMemo(() => {
    const lightTheme = createTheme({
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

    const darkTheme = createTheme({
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

    if (mode === "auto") {
      return isDarkMode ? darkTheme : lightTheme;
    }

    if (mode === "dark") {
      return darkTheme;
    }

    return lightTheme;
  }, [isDarkMode, mode]);

  const color = useMemo(() => {
    if (mode === "light" || mode === "auto" && !isDarkMode) {
      if (scrolledTop) {
        console.log("HERE");
        return theme.palette.common.black;
      }

      return theme.palette.common.white;
    }

    if (mode === "dark" || mode === "auto" && isDarkMode) {
      return theme.palette.common.white;
    }
  }, [mode, isDarkMode, scrolledTop, theme.palette.common.white, theme.palette.common.black]);

  return {
    theme,
    isDarkMode,
    color
  };
};
