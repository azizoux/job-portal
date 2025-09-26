import Application from "../models/Application.js";
import Job from "../models/Job.js";

// @desc Apply to job
export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ success: false, message: "Only job seekers can apply" });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: req.user.resume, // assuming resume is stored in user
    });
    res.status(201).json({ success: true, application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get logged-in user's applications
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id }).populate(
      "job",
      "title company location type"
    );
    res.status(200).json({ success: true, apps });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all applicants for a job (Employer)
export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to view applicants" });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("job", "title location category type")
      .populate("applicant", "name email avatar resume");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get Application by ID (Jobseeker or Employer)
export const getApplicationById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update application status (employer)
export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
