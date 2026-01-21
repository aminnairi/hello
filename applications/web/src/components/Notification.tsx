import { Alert, Snackbar } from "@mui/material";
import { useNotification } from "../hooks/useNotification";

export const Notification = () => {
  const {
    notificationDuration,
    notificationOpened,
    notificationSeverity,
    notificationMessage,
    closeNotification,
  } = useNotification();

  return (
    <Snackbar autoHideDuration={notificationDuration} onClose={closeNotification} open={notificationOpened}>
      <Alert severity={notificationSeverity} variant="filled">
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};
