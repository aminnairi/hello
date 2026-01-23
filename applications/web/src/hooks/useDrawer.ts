import { useCallback } from "react";
import { useDrawerOpenedState } from "../states/useDrawerOpenedState";

export const useDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useDrawerOpenedState();

  const openDrawer = useCallback(() => {
    setDrawerOpened(true);
  }, [setDrawerOpened]);

  const closeDrawer = useCallback(() => {
    setDrawerOpened(false);
  }, [setDrawerOpened]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpened(previousDrawerOpened => {
      return !previousDrawerOpened;
    });
  }, [setDrawerOpened]);

  return {
    drawerOpened,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
};
