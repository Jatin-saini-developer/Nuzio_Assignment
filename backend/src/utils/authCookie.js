import { isProduction } from "../config/env.js";

export const AUTH_COOKIE_NAME = "nuzio_session";
export const AUTH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: AUTH_COOKIE_MAX_AGE_MS,
  path: "/",
});

export const getClearAuthCookieOptions = () => ({
  ...getAuthCookieOptions(),
  maxAge: undefined,
});
