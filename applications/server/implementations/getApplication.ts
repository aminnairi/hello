import { randomUUID } from "crypto";
import { implementGetApplications } from "../routes/getApplications";
import { settings } from "../settings"
import { checkAuthentication } from "../functions/checkAuthentication";

export const getApplications = implementGetApplications(async ({ token }) => {
  const authenticationError = await checkAuthentication(settings, token);

  if (authenticationError instanceof Error) {
    return {
      success: false,
      error: "Unauthenticated",
    };
  }

  return {
    success: true,
    applications: settings.applications.map(application => {
      return {
        identifier: randomUUID(),
        name: application.name,
        url: application.url,
      }
    }),
  };
});
