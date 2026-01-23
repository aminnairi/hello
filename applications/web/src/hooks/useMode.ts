import { useCallback } from "react";
import { useModeState } from "./useModeState"

export const useMode = () => {
  const [mode, setMode] = useModeState();

  const toggleMode = useCallback(() => {
    setMode(previousMode => {
      if (previousMode === "dark") {
        return "light";
      }

      if (previousMode === "light") {
        return "auto";
      }

      return "dark";
    });
  }, [setMode]);

  return {
    mode,
    setMode,
    toggleMode,
  };
}
