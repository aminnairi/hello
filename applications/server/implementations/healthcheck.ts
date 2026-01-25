import { implementHealthcheck } from "../routes/healthcheck";

export const healthcheck = implementHealthcheck(async () => {
  return null;
});
