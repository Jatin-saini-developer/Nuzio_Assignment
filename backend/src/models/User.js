import mongoose from "mongoose";

const notificationPreferencesSchema = new mongoose.Schema(
  {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    dailyBrief: {
      type: Boolean,
      default: true,
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
    language: {
      type: String,
      trim: true,
    },
    profession: {
      type: String,
      trim: true,
    },
    niches: {
      type: [String],
      default: [],
    },
    voice: {
      type: String,
      trim: true,
    },
    briefLength: {
      type: String,
      enum: ["short", "medium", "long"],
      default: "medium",
    },
    deliveryTime: {
      type: String,
      trim: true,
    },
    notificationPreferences: {
      type: notificationPreferencesSchema,
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
