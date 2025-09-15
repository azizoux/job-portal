import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
// Connect Database
connectDB();
// Server uploads folder
app.use("/uploads", express.static("uploads"));
// Routes
// app.use("/api/auth", authRoutes);
// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
