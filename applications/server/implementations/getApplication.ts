import { implementGetApplications } from "../routes/getApplications";
import { settings } from "../settings"

export const getApplications = implementGetApplications(async () => {
  return {
    applications: settings.applications,
  };
});
