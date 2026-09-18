/**
 * Serialise a User document to a safe onboarding-state object.
 *
 * Never exposes auth / identity fields.
 * Returns sensible nulls/defaults when a field has not been set yet.
 */
export const toSafeOnboarding = (user) => ({
  language: user.language ?? null,
  profession: user.profession ?? null,
  niches: Array.isArray(user.niches) ? user.niches : [],
  voice: user.voice ?? null,
  briefLength: user.briefLength ?? null,
  deliveryTime: user.deliveryTime ?? null,
  notifications: {
    push: user.notificationPreferences?.push ?? null,
    email: user.notificationPreferences?.email ?? null,
    dailyBrief: user.notificationPreferences?.dailyBrief ?? null,
  },
  onboarding: {
    completed: user.onboarding?.completed ?? false,
    currentStep: user.onboarding?.currentStep ?? 0,
  },
});
