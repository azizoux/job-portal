import express from "express";

import { login, register, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/upload-image", upload.single("image"), (req, res) => {
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
});

export default router;
