import { Router } from "express";

import {
  getOnboarding,
  updateOnboarding,
} from "../controllers/onboardingController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Both routes require an authenticated session cookie.
// The user is identified from the JWT — no userId from the client is trusted.

router.get("/", requireAuth, getOnboarding);
router.put("/", requireAuth, updateOnboarding);

export default router;
