/**
 * Onboarding API client module.
 *
 * Thin wrapper around the shared apiRequest client.
 * All requests include the session cookie automatically (credentials: "include").
 * No JWTs are touched here — authentication is handled server-side via cookie.
 */
import { apiRequest } from "./client";

/**
 * Fetch the authenticated user's current onboarding state.
 *
 * @returns {Promise<{ status: string, onboarding: object }>}
 */
export const getOnboarding = () => apiRequest("/api/onboarding");

/**
 * Partially update onboarding state for the authenticated user.
 * Only send the fields relevant to the current step — the backend
 * merges them atomically and preserves all other fields.
 *
 * @param {object} data - Partial onboarding fields to update
 * @returns {Promise<{ status: string, onboarding: object }>}
 */
export const updateOnboarding = (data) =>
  apiRequest("/api/onboarding", {
    method: "PUT",
    body: JSON.stringify(data),
  });

/**
 * Map of onboarding currentStep index → React Router route path.
 * Used to resume onboarding at the correct screen.
 */
export const STEP_TO_ROUTE = [
  "/language",      // 0
  "/profession",    // 1
  "/niches",        // 2
  "/voice",         // 3
  "/time",          // 4
  "/notifications", // 5
  "/all-set",       // 6 — complete
];

/**
 * Return the route the user should be sent to, based on their current step.
 *
 * @param {number} currentStep
 * @returns {string} route path
 */
export const getResumeRoute = (currentStep) =>
  STEP_TO_ROUTE[currentStep] ?? "/profession";
