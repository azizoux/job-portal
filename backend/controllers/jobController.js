import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";

// @desc Create a new job (Employer only)
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res
        .status(403)
        .json({ success: false, message: "Only employers can post jobs" });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc get job
export const getJobs = async (req, res) => {
  const { keyword, location, category, type, minSalary, maxSalary, userId } =
    req.query;
  const query = {
    isClosed: false,
    ...(keyword && { title: keyword, $options: "1" }),
    ...(location && { location: { $regex: location, $options: "1" } }),
    ...(category && { category }),
    ...(type && { type }),
  };

  if (minSalary || maxSalary) {
    query.$and = [];
    if (minSalary) {
      query.$and.push({ salaryMax: { $gte: Number(minSalary) } });
    }
    if (maxSalary) {
      query.$and.push({ salaryMin: { $lte: Number(maxSalary) } });
    }
    if (query.$and.length === 0) {
      delete query.$and;
    }
  }
  try {
    const jobs = await Job.find(query).populate(
      "company",
      "name companyName companyLogo,"
    );

    let savedJobIds = [];
    let appliedJobStatusMap = {};

    if (userI) {
      // Saved Jobs
      const savedJobs = await SavedJob.find({ jobseeker: userId }).select(
        "job"
      );
      savedJobIds = savedJobs.map((s) => String(s.job));
      // Applications
      const applications = await Application.find({ applicant: userId }).select(
        "job satatus"
      );
      applications.forEach((app) => {
        appliedJobStatusMap[String(app.job)] = app.status;
      });
    }
    // Add isSaved and applicationStatus to each job
    const jobsWithExtras = jobs.map((job) => {
      const jobIdStr = String(job._id);
      return {
        ...job.toObject(),
        isSaved: savedJobIds.includes(jobIdStr),
        applicationStatus: appliedJobStatusMap[jobIdStr] || null,
      };
    });
    res.status(200).json({ success: true, jobsWithExtras });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc getJobsEmployer
export const getJobsEmployer = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc get Job By Id
export const getJobById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc update a job
export const updateJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc delete a job
export const deleteJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc toggle close a job
export const toggleCloseJob = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
