import mongoose from "mongoose";

import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_PROFESSIONS,
  SUPPORTED_VOICES,
  SUPPORTED_BRIEF_LENGTHS,
} from "../utils/onboardingConstants.js";

const notificationPreferencesSchema = new mongoose.Schema(
  {
    email: {
      type: Boolean,
      default: null,
    },
    push: {
      type: Boolean,
      default: null,
    },
    dailyBrief: {
      type: Boolean,
      default: null,
    },
  },
  { _id: false },
);

const authProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },
    providerId: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const onboardingMetaSchema = new mongoose.Schema(
  {
    completed: {
      type: Boolean,
      default: false,
    },
    currentStep: {
      type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    auth: {
      type: authProviderSchema,
      default: () => ({}),
    },

    // ── Onboarding preferences ──────────────────────────────────────────────

    language: {
      type: String,
      enum: [...SUPPORTED_LANGUAGES, null],
      trim: true,
      default: null,
    },
    profession: {
      type: String,
      enum: [...SUPPORTED_PROFESSIONS, null],
      trim: true,
      default: null,
    },
    niches: {
      type: [String],
      default: [],
    },
    voice: {
      type: String,
      enum: [...SUPPORTED_VOICES, null],
      trim: true,
      default: null,
    },
    briefLength: {
      type: String,
      enum: [...SUPPORTED_BRIEF_LENGTHS, null],
      default: null,
    },
    deliveryTime: {
      type: String,
      trim: true,
      default: null,
    },
    notificationPreferences: {
      type: notificationPreferencesSchema,
      default: () => ({ email: null, push: null, dailyBrief: null }),
    },

    // ── Onboarding progress meta ────────────────────────────────────────────

    onboarding: {
      type: onboardingMetaSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { "auth.provider": 1, "auth.providerId": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "auth.provider": "google",
      "auth.providerId": { $type: "string" },
    },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
