import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import { getClientUrl } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = [getClientUrl()];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/onboarding", onboardingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
