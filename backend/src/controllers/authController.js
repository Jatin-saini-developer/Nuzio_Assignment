import { authenticateWithGoogle } from "../services/googleAuthService.js";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  getClearAuthCookieOptions,
} from "../utils/authCookie.js";

export const googleAuth = async (req, res, next) => {
  try {
    const { token, user } = await authenticateWithGoogle(req.body?.code);

    res
      .cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions())
      .status(200)
      .json({
        status: "success",
        user,
      });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.safeUser,
  });
};

export const logout = (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, getClearAuthCookieOptions()).status(200).json({
    status: "success",
    message: "Logged out",
  });
};
