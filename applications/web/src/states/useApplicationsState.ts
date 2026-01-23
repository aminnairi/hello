import { createState } from "@aminnairi/react-signal";
import type { Applications } from "@hello/server/routes/getApplications/output";

export const useApplicationsState = createState<Applications>([]);
