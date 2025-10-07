import Analytics from "../models/Analytics.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { getTrend } from "../Utils/utils.js";

export const getEmployerAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ success: false, message: "Acces Denied " });
    }

    const companyId = req.user._id;

    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);
    const prev7Days = new Date(now);
    prev7Days.setDate(now.getDate() - 14);

    // === COUNT ===
    const totalActiveJobs = await Job.countDocuments({
      company: companyId,
      isClosed: false,
    });
    const jobs = await Job.find({ company: companyId }).select("id").lean();
    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const totalHired = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    // === TRENDS ===

    // Active job Posts trend
    const activeJobLast7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: last7Days, $lte: now },
    });

    const activeJobPrev7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });

    const activeJobTrend = getTrend(activeJobLast7, activeJobPrev7);

    // Application  trend
    const applicationLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7Days, $lte: now },
    });

    const applicationPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });

    const applicationTrend = getTrend(applicationLast7, applicationPrev7);

    // Hired applicant trend
    const hiredLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: last7Days, $lte: now },
    });

    const hiredPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });

    const hiredTrend = getTrend(hiredLast7, hiredPrev7);

    // === DATA ===
    const recentJobs = await Job.find({ company: companyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title location type createdAt isClosed");

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("applicant", "name email avatar")
      .populate("job", "title");

    const counts = {
      totalActiveJobs,
      totalApplications,
      totalHired,
      trends: {
        activeJob: activeJobTrend,
        totalApplicants: applicationTrend,
        totalHired: hiredTrend,
      },
      data: {
        recentJobs,
        recentApplications,
      },
    };

    res.status(200).json({ success: true, counts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
