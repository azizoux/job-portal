import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract token

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "Not Authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
