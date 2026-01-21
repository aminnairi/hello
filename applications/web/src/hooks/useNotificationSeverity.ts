import { createState } from "@aminnairi/react-signal";
import type { AlertColor } from "@mui/material";

export const useNotificationSeverity = createState<AlertColor>("success");
