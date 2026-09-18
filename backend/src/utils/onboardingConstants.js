/**
 * Centralised onboarding option constants.
 *
 * These are the single source of truth for:
 *   - Mongoose enum values in User.js
 *   - Controller-level validation in onboardingController.js
 *   - Completion criteria / currentStep derivation
 *
 * Keep in sync with the frontend's src/data/onboardingData.js
 */

export const SUPPORTED_LANGUAGES = ["en", "hi"];

export const SUPPORTED_PROFESSIONS = [
  "Finance & Trading",
  "Legal",
  "Technology",
  "Healthcare",
  "Consulting",
  "Marketing & Media",
  "Government & Policy",
  "Real Estate",
  "Education",
  "Founder / Builder",
];

export const SUPPORTED_NICHES = [
  "AI & Technology",
  "Financial Markets",
  "Indian Business",
  "Global Politics",
  "Startups",
  "Science",
  "Geopolitics",
  "Health & Medicine",
  "Climate & Energy",
  "Sports",
  "Culture & Arts",
  "Legal & Policy",
];

export const MAX_NICHES = 7;

export const SUPPORTED_VOICES = ["aria", "kai", "meera"];

export const SUPPORTED_BRIEF_LENGTHS = ["5 min", "10 min", "15 min", "Custom"];

/**
 * Delivery time must match "HH:MM AM" or "HH:MM PM".
 * Examples: "07:00 AM", "12:30 PM", "09:15 AM"
 */
export const DELIVERY_TIME_PATTERN = /^(0[1-9]|1[0-2]):[0-5]\d (AM|PM)$/;

/**
 * Ordered steps used to derive currentStep.
 * Index = step number reported to the frontend.
 *
 * currentStep === 6 means onboarding is complete.
 */
export const ONBOARDING_STEPS = [
  "language",    // 0
  "profession",  // 1
  "niches",      // 2
  "voice",       // 3
  "deliveryTime",// 4
  "notifications", // 5
  // 6 = all done
];

/**
 * Route corresponding to each step index.
 * Used by the frontend to resume onboarding at the right screen.
 */
export const STEP_ROUTES = [
  "/language",       // 0
  "/profession",     // 1
  "/niches",         // 2
  "/voice",          // 3
  "/time",           // 4
  "/notifications",  // 5
  "/all-set",        // 6 — complete
];

/**
 * Whitelist of fields that the client is allowed to send
 * in a PUT /api/onboarding body.
 */
export const ALLOWED_ONBOARDING_FIELDS = [
  "language",
  "profession",
  "niches",
  "voice",
  "briefLength",
  "deliveryTime",
  "notifications",
];
