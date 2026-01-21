import { useCallback } from "react";
import { useNotificationDuration } from "./useNotificationDuration";
import { useNotificationMessage } from "./useNotificationMessage";
import { useNotificationSeverity } from "./useNotificationSeverity";
import { useNotificationOpened } from "./useNotificationOpened";

export const useNotification = () => {
  const [notificationDuration, setNotificationDuration] = useNotificationDuration();
  const [notificationMessage, setNotificationMessage] = useNotificationMessage();
  const [notificationSeverity, setNotificationSeverity] = useNotificationSeverity();
  const [notificationOpened, setNotificationOpened] = useNotificationOpened();

  const closeNotification = useCallback(() => {
    setNotificationOpened(false);
  }, [setNotificationOpened]);

  const openSuccessNotification = useCallback((message: string) => {
    setNotificationSeverity("success");
    setNotificationMessage(message);
    setNotificationDuration(5000);
    setNotificationOpened(true);
  }, [setNotificationDuration, setNotificationMessage, setNotificationOpened, setNotificationSeverity]);

  const openErrorNotification = useCallback((message: string) => {
    setNotificationSeverity("error");
    setNotificationMessage(message);
    setNotificationDuration(5000);
    setNotificationOpened(true);
  }, [setNotificationDuration, setNotificationMessage, setNotificationOpened, setNotificationSeverity]);

  return {
    notificationOpened,
    notificationMessage,
    notificationSeverity,
    notificationDuration,
    closeNotification,
    openSuccessNotification,
    openErrorNotification,
  };
};
