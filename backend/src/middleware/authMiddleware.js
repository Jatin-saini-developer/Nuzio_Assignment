import User from "../models/User.js";
import { AUTH_COOKIE_NAME } from "../utils/authCookie.js";
import { toSafeUser } from "../utils/safeUser.js";
import { verifySessionToken } from "../services/tokenService.js";

export const requireAuth = async (req, _res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    const payload = verifySessionToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      const error = new Error("Authenticated user no longer exists");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    req.safeUser = toSafeUser(user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Session expired";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid session";
    }

    next(error);
  }
};
