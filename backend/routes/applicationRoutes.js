import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  getApplicationById,
  updateStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:jobId", protect, applyToJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);
router.get("/:id", protect, getApplicationById);
router.post("/:id/status", protect, updateStatus);

export default router;
