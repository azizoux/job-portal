import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../Utils/utils.js";

// @desc register new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role, avatar });

    const formattedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      companyName: user.companyName || "",
      companyDescription: user.companyDescription || "",
      companyLogo: user.companyLogo || "",
      resume: user.resume || "",
    };
    res.status(201).json({ success: true, user: formattedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//@desc login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = bcryptjs.compare(user.password, password); // await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const formattedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      companyName: user.companyName || "",
      companyDescription: user.companyDescription || "",
      companyLogo: user.companyLogo || "",
      resume: user.resume || "",
    };

    res
      .status(200)
      .json({ success: true, message: "login success", user: formattedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//@desc Get Logged-In User
export const getMe = async (req, res) => {
  res.json(req.user);
};

// @desc upload image
export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.log("error lors de l'import du fichier");
    return res.status.json({ success: false, message: error.message });
  }
};
