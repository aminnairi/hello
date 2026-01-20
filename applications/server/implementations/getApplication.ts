import { implementGetApplications } from "../routes"
import { settings } from "../settings"

export const getApplications = implementGetApplications(async () => {
  return {
    applications: settings.applications,
  };
});
