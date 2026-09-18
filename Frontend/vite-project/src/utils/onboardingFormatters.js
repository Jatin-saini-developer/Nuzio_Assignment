/**
 * Formatting utilities for onboarding display values on the All Set screen.
 *
 * All logic is kept here so AllSet.jsx stays clean and these helpers
 * can be reused or tested independently.
 */

/**
 * Voice metadata — mirrors the voice list in Voice.jsx.
 * Provides human-readable display labels from stored IDs.
 */
const VOICE_META = {
  aria: { name: "Aria", descriptor: "British, warm" },
  kai: { name: "Kai", descriptor: "American, crisp" },
  meera: { name: "Meera", descriptor: "Indian, bright" },
};

/**
 * Brief length → "stories · ~duration" display string.
 * Mirrors the Figma card values.
 */
const BRIEF_LENGTH_DISPLAY = {
  "5 min": "5 stories · ~18 min",
  "10 min": "7 stories · ~28 min",
  "15 min": "10 stories · ~38 min",
  Custom: "Custom length",
};

/**
 * Format a profession string for display.
 * Currently a pass-through — the stored value is already human-readable.
 *
 * @param {string|null} profession
 * @returns {string}
 */
export const formatProfession = (profession) => profession || "—";

/**
 * Format a niches array into a compact summary string.
 * Examples:
 *   ["AI & Technology"] → "AI & Technology"
 *   ["AI & Technology", "Startups", "Science"] → "AI, Startups, Science"
 *   ["AI & Technology", "Startups", "Science", "Sports"] → "AI, Startups, Science +1"
 *
 * Keeps the display short to fit the profile card.
 *
 * @param {string[]} niches
 * @param {number} maxVisible — how many to show before "+N"
 * @returns {string}
 */
export const formatNiches = (niches, maxVisible = 3) => {
  if (!Array.isArray(niches) || niches.length === 0) return "—";

  // Shorten long niche names to a first keyword for compactness
  const shorten = (label) => {
    const shortcuts = {
      "AI & Technology": "AI",
      "Financial Markets": "Markets",
      "Indian Business": "India",
      "Global Politics": "Politics",
      Startups: "Startups",
      Science: "Science",
      Geopolitics: "Geopolitics",
      "Health & Medicine": "Health",
      "Climate & Energy": "Climate",
      Sports: "Sports",
      "Culture & Arts": "Arts",
      "Legal & Policy": "Legal",
    };
    return shortcuts[label] || label.split(" ")[0];
  };

  const visible = niches.slice(0, maxVisible);
  const remainder = niches.length - maxVisible;

  const base = visible.map(shorten).join(", ");
  return remainder > 0 ? `${base} +${remainder}` : base;
};

/**
 * Format a voice ID into a human-readable display string.
 * Example: "aria" → "Aria — British, warm"
 *
 * @param {string|null} voiceId
 * @returns {string}
 */
export const formatVoice = (voiceId) => {
  if (!voiceId) return "—";
  const meta = VOICE_META[voiceId];
  if (!meta) return voiceId;
  return `${meta.name} — ${meta.descriptor}`;
};

/**
 * Format a brief length value into the Figma-friendly stories display.
 * Example: "5 min" → "5 stories · ~18 min"
 *
 * @param {string|null} briefLength
 * @returns {string}
 */
export const formatBriefLength = (briefLength) => {
  if (!briefLength) return "—";
  return BRIEF_LENGTH_DISPLAY[briefLength] || briefLength;
};

/**
 * Format a canonical delivery time string into the Figma display format.
 * Example: "07:00 AM" → "Daily at 7:00 AM"
 *
 * @param {string|null} deliveryTime
 * @returns {string}
 */
export const formatDeliveryTime = (deliveryTime) => {
  if (!deliveryTime) return "—";

  // Parse "HH:MM AM/PM" — strip leading zero from hour for display
  const match = deliveryTime.match(/^0?(\d+):(\d{2}) (AM|PM)$/);
  if (!match) return deliveryTime;

  const [, hour, minute, period] = match;
  return `Daily at ${hour}:${minute} ${period}`;
};

/**
 * Get the first name from a full display name.
 * Falls back to "there" if no name is available.
 *
 * @param {string|null|undefined} fullName
 * @returns {string}
 */
export const getFirstName = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "there";
  const first = fullName.trim().split(/\s+/)[0];
  return first || "there";
};

/**
 * Build the five profile summary rows from real onboarding data.
 *
 * @param {object} onboarding — the onboarding object from the API
 * @returns {Array<{ icon, label, value }>}
 */
export const buildProfileRows = (onboarding) => [
  {
    icon: "💻",
    label: "PROFESSION",
    value: formatProfession(onboarding.profession),
  },
  {
    icon: "♟",
    label: "NICHES",
    value: formatNiches(onboarding.niches),
  },
  {
    icon: "🎙",
    label: "VOICE",
    value: formatVoice(onboarding.voice),
  },
  {
    icon: "◷",
    label: "LENGTH",
    value: formatBriefLength(onboarding.briefLength),
  },
  {
    icon: "🌞",
    label: "DELIVERY",
    value: formatDeliveryTime(onboarding.deliveryTime),
  },
];
