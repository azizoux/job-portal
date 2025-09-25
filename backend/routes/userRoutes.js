import express from "express";
import {
  updateProfile,
  deleteResume,
  getPublicProfile,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Protected routes
router.put("/profile", protect, updateProfile);
router.delete("/resume", protect, deleteResume);

//Public route
router.get("/:id", getPublicProfile);

export default router;
