import { OAuth2Client } from "google-auth-library";

import { getGoogleConfig } from "../config/env.js";
import User from "../models/User.js";
import { signSessionToken } from "./tokenService.js";
import { toSafeUser } from "../utils/safeUser.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const getGoogleOAuthClient = () => {
  const { clientId, clientSecret } = getGoogleConfig();
  return new OAuth2Client(clientId, clientSecret, "postmessage");
};

const verifyGoogleCode = async (code) => {
  const { clientId } = getGoogleConfig();
  const oauthClient = getGoogleOAuthClient();
  const { tokens } = await oauthClient.getToken(code);

  if (!tokens.id_token) {
    const error = new Error("Google did not return an identity token");
    error.statusCode = 401;
    throw error;
  }

  const ticket = await oauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    const error = new Error("Google account identity could not be verified");
    error.statusCode = 401;
    throw error;
  }

  return {
    googleId: payload.sub,
    email: normalizeEmail(payload.email),
    name: payload.name || "",
    avatarUrl: payload.picture || "",
  };
};

const findOrCreateGoogleUser = async ({ googleId, email, name, avatarUrl }) => {
  const user = await User.findOne({
    $or: [{ "auth.provider": "google", "auth.providerId": googleId }, { email }],
  });

  if (user) {
    user.name = name || user.name;
    user.email = email;
    user.avatarUrl = avatarUrl || user.avatarUrl;
    user.auth = {
      provider: "google",
      providerId: googleId,
    };

    return user.save();
  }

  try {
    return await User.create({
      name,
      email,
      avatarUrl,
      auth: {
        provider: "google",
        providerId: googleId,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error("A user with this Google account already exists");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
};

export const authenticateWithGoogle = async (code) => {
  if (!code || typeof code !== "string") {
    const error = new Error("Google authorization code is required");
    error.statusCode = 400;
    throw error;
  }

  const googleProfile = await verifyGoogleCode(code);
  const user = await findOrCreateGoogleUser(googleProfile);

  return {
    token: signSessionToken(user),
    user: toSafeUser(user),
  };
};
