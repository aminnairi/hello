import { Settings } from "../schema";
import jsonwebtoken from "jsonwebtoken";

export class AuthenticationError extends Error {
  public override readonly name = "AuthenticationErorr";
}

export const checkAuthentication = async (settings: Settings, token: string) => {
  if (!settings.authentication) {
    return null;
  }

  try {
    jsonwebtoken.verify(token, settings.authentication.jsonWebTokenSecret);
    return null;
  } catch {
    console.error("Json web token error");
    return new AuthenticationError;
  }
};
