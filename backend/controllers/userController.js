import fs from "fs";
import path, { dirname } from "path";
import User from "../models/User.js";

// @desc  Update user profile (name, avatar, company, resume)
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      companyName,
      companyLogo,
      companyDescription,
      resume,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    //If employer, allow updating company info
    if (user.role === "employuer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }
    await user.save();
    const formattedUser = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      companyName: user.companyName,
      companyDescription: user.companyDescription,
      companyLogo: user.companyLogo,
      resume: user.resume || "",
    };
    res.status(200).json({ success: true, user: formattedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete resume file (Jobseeker only)
export const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body; // expect resumeUrl to be the URL of the resume

    // Extract file name from the URL
    const fileName = resumeUrl?.split("/")?.pop();

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ success: false, message: "Only jobseekers can delete resume" });
    }

    //Contruct the full file path

    const filePath = path.join("uploads/", fileName);
    console.log("filePath:", filePath);

    // Check if the file exists and then delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete yhe file
    }

    // Set the user's resume to an empty string
    user.resume = "";
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get user public profile
export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
