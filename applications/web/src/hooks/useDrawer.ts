import { useCallback, useState } from "react";

export const useDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  return {
    drawerOpened,
    openDrawer,
    closeDrawer
  }
};
