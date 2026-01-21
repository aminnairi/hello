import { randomUUID } from "crypto";
import { implementGetApplications } from "../routes/getApplications";
import { settings } from "../settings"

export const getApplications = implementGetApplications(async () => {
  return {
    applications: settings.applications.map(application => {
      return {
        identifier: randomUUID(),
        name: application.name,
        url: application.url,
      }
    }),
  };
});
