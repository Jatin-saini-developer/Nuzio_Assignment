import jwt from "jsonwebtoken";

import { getJwtSecret } from "../config/env.js";
import { AUTH_COOKIE_MAX_AGE_MS } from "../utils/authCookie.js";

const jwtExpiresInSeconds = Math.floor(AUTH_COOKIE_MAX_AGE_MS / 1000);

export const signSessionToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
    },
    getJwtSecret(),
    {
      expiresIn: jwtExpiresInSeconds,
    },
  );

export const verifySessionToken = (token) => jwt.verify(token, getJwtSecret());
