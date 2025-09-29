import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  savedJob,
  unSaveJob,
  getMySavedJobs,
} from "../controllers/savedJobsController.js";

const router = express.Router();

router.post("/:jobId", protect, savedJob);
router.delete("/:jobId", protect, unSaveJob);
router.get("/my", protect, getMySavedJobs);

export default router;
