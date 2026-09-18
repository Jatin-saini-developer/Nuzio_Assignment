import User from "../models/User.js";
import { toSafeOnboarding } from "../utils/safeOnboarding.js";
import {
  ALLOWED_ONBOARDING_FIELDS,
  DELIVERY_TIME_PATTERN,
  MAX_NICHES,
  ONBOARDING_STEPS,
  SUPPORTED_BRIEF_LENGTHS,
  SUPPORTED_LANGUAGES,
  SUPPORTED_NICHES,
  SUPPORTED_PROFESSIONS,
  SUPPORTED_VOICES,
} from "../utils/onboardingConstants.js";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derives onboarding progress from the current user document.
 *
 * currentStep: index of the first missing required field.
 *   0 = language missing   → send to /language
 *   1 = profession missing → send to /profession
 *   2 = niches missing     → send to /niches
 *   3 = voice missing      → send to /voice
 *   4 = deliveryTime miss  → send to /time
 *   5 = notifications miss → send to /notifications
 *   6 = all done           → send to /all-set
 *
 * completed: true only when ALL required fields are satisfied.
 */
const deriveOnboardingProgress = (user) => {
  const checks = [
    // step 0 — language
    Boolean(user.language),
    // step 1 — profession
    Boolean(user.profession),
    // step 2 — niches (at least one)
    Array.isArray(user.niches) && user.niches.length > 0,
    // step 3 — voice AND brief length
    Boolean(user.voice) && Boolean(user.briefLength),
    // step 4 — delivery time
    Boolean(user.deliveryTime),
    // step 5 — notifications decision made (not null)
    user.notificationPreferences?.push !== null &&
      user.notificationPreferences?.push !== undefined,
  ];

  const firstMissing = checks.indexOf(false);
  const currentStep = firstMissing === -1 ? ONBOARDING_STEPS.length : firstMissing;
  const completed = firstMissing === -1;

  return { currentStep, completed };
};

const createValidationError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

// ─────────────────────────────────────────────────────────────────────────────
// Validators — each throws a 400 error if invalid
// ─────────────────────────────────────────────────────────────────────────────

const validateLanguage = (value) => {
  if (!SUPPORTED_LANGUAGES.includes(value)) {
    throw createValidationError(
      `Invalid language. Supported values: ${SUPPORTED_LANGUAGES.join(", ")}`,
    );
  }
};

const validateProfession = (value) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw createValidationError("Profession must be a non-empty string");
  }
  if (value.trim().length > 100) {
    throw createValidationError("Profession value is too long");
  }
  if (!SUPPORTED_PROFESSIONS.includes(value.trim())) {
    throw createValidationError(
      `Invalid profession. Must be one of: ${SUPPORTED_PROFESSIONS.join(", ")}`,
    );
  }
};

const validateNiches = (value) => {
  if (!Array.isArray(value)) {
    throw createValidationError("Niches must be an array");
  }
  if (value.length > MAX_NICHES) {
    throw createValidationError(`You can select a maximum of ${MAX_NICHES} niches`);
  }
  for (const niche of value) {
    if (typeof niche !== "string") {
      throw createValidationError("Each niche must be a string");
    }
    if (!SUPPORTED_NICHES.includes(niche)) {
      throw createValidationError(
        `Invalid niche: "${niche}". Must be one of the supported niches.`,
      );
    }
  }
};

const validateVoice = (value) => {
  if (!SUPPORTED_VOICES.includes(value)) {
    throw createValidationError(
      `Invalid voice. Supported values: ${SUPPORTED_VOICES.join(", ")}`,
    );
  }
};

const validateBriefLength = (value) => {
  if (!SUPPORTED_BRIEF_LENGTHS.includes(value)) {
    throw createValidationError(
      `Invalid brief length. Supported values: ${SUPPORTED_BRIEF_LENGTHS.join(", ")}`,
    );
  }
};

const validateDeliveryTime = (value) => {
  if (typeof value !== "string") {
    throw createValidationError("Delivery time must be a string");
  }
  if (!DELIVERY_TIME_PATTERN.test(value)) {
    throw createValidationError(
      'Delivery time must be in "HH:MM AM" or "HH:MM PM" format, e.g. "07:00 AM"',
    );
  }
};

const validateNotifications = (value) => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw createValidationError("Notifications must be an object");
  }
  const allowed = ["push", "email", "dailyBrief"];
  for (const key of allowed) {
    if (key in value && typeof value[key] !== "boolean") {
      throw createValidationError(`notifications.${key} must be a boolean`);
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Validate + build a safe $set payload from raw body
// ─────────────────────────────────────────────────────────────────────────────

const buildUpdatePayload = (body) => {
  const update = {};

  // Reject any fields that are not in the allowed whitelist
  const incoming = Object.keys(body);
  const unknown = incoming.filter((k) => !ALLOWED_ONBOARDING_FIELDS.includes(k));
  if (unknown.length > 0) {
    throw createValidationError(
      `Unknown onboarding field(s): ${unknown.join(", ")}`,
    );
  }

  if ("language" in body) {
    validateLanguage(body.language);
    update.language = body.language;
  }

  if ("profession" in body) {
    validateProfession(body.profession);
    update.profession = body.profession.trim();
  }

  if ("niches" in body) {
    validateNiches(body.niches);
    update.niches = body.niches;
  }

  if ("voice" in body) {
    validateVoice(body.voice);
    update.voice = body.voice;
  }

  if ("briefLength" in body) {
    validateBriefLength(body.briefLength);
    update.briefLength = body.briefLength;
  }

  if ("deliveryTime" in body) {
    validateDeliveryTime(body.deliveryTime);
    update.deliveryTime = body.deliveryTime;
  }

  if ("notifications" in body) {
    validateNotifications(body.notifications);
    const n = body.notifications;
    if ("push" in n) update["notificationPreferences.push"] = n.push;
    if ("email" in n) update["notificationPreferences.email"] = n.email;
    if ("dailyBrief" in n) update["notificationPreferences.dailyBrief"] = n.dailyBrief;
  }

  return update;
};

// ─────────────────────────────────────────────────────────────────────────────
// Controllers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/onboarding
 *
 * Returns the authenticated user's current onboarding state.
 * req.user is set by requireAuth middleware.
 */
export const getOnboarding = (req, res) => {
  res.status(200).json({
    status: "success",
    onboarding: toSafeOnboarding(req.user),
  });
};

/**
 * PUT /api/onboarding
 *
 * Partially updates onboarding fields for the authenticated user.
 * Only whitelisted fields are accepted.
 * After update, recomputes onboarding.completed and onboarding.currentStep.
 */
export const updateOnboarding = async (req, res, next) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      const error = new Error("Request body must be a JSON object");
      error.statusCode = 400;
      throw error;
    }

    if (Object.keys(body).length === 0) {
      const error = new Error("Request body must not be empty");
      error.statusCode = 400;
      throw error;
    }

    // Validate and extract safe $set fields
    const fieldUpdates = buildUpdatePayload(body);

    // Apply field updates atomically, then derive new progress
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: fieldUpdates },
      { new: true, runValidators: true },
    );

    if (!updated) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Recompute completion after fields have been applied
    const { currentStep, completed } = deriveOnboardingProgress(updated);

    // Persist progress meta only if it changed
    if (
      updated.onboarding?.completed !== completed ||
      updated.onboarding?.currentStep !== currentStep
    ) {
      await User.findByIdAndUpdate(updated._id, {
        $set: {
          "onboarding.completed": completed,
          "onboarding.currentStep": currentStep,
        },
      });
      updated.onboarding = { completed, currentStep };
    }

    res.status(200).json({
      status: "success",
      onboarding: toSafeOnboarding(updated),
    });
  } catch (error) {
    next(error);
  }
};
