import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};
// @desc register new user
export const register = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//@desc login user
export const login = async (req, res) => {};
//@desc Get Logged-In User
export const getMe = async (req, res) => {
  res.json(req.user);
};
