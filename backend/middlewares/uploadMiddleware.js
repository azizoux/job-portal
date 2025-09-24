import multer from "multer";
//Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname.replace(/\s+/g, "")}`);
  },
});
export const upload = multer({ storage: storage });
