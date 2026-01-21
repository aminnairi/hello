import { implementSignIn } from "../routes/signIn";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { settings } from "../settings";

export const signIn = implementSignIn(async ({ userName, password }) => {
  try {
    if (!settings.authentication) {
      return {
        success: false,
        error: "BadCredentials",
      };
    }

    if (userName !== settings.authentication.userName) {
      return {
        success: false,
        error: "BadCredentials",
      };
    }

    const isValidPassword = await bcrypt.compare(password, settings.authentication.hashedPassword);

    if (!isValidPassword) {
      return {
        success: false,
        error: "BadCredentials",
      };
    }

    return {
      success: true,
      token: jsonwebtoken.sign({}, settings.authentication.jsonWebTokenSecret, {
        expiresIn: "1d",
        algorithm: "HS256",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "BadCredentials",
    }
  }
});
