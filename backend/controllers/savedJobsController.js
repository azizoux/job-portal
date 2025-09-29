import SavedJob from "../models/SavedJob.js";
import Job from "../models/Job.js";

// @desc save job
export const savedJob = async (req, res) => {
  try {
    const existingSavedJob = await SavedJob.findOne({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    if (existingSavedJob) {
      return res
        .status(400)
        .json({ success: false, message: "Job already saved" });
    }
    const saved = await SavedJob.create({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    res.status(201).json({ success: true, saved });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc unsave a job
export const unSaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    res
      .status(200)
      .json({ success: true, message: "Job removed from saved list" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc get saved jobs for current user
export const getMySavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ jobseeker: req.user._id }).populate(
      {
        path: "job",
        populate: {
          path: "company",
          select: "name companyName companyLogo",
        },
      }
    );
    res.status(200).json({ success: true, savedJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
