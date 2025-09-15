import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Mongo DB connected...");
  } catch (error) {
    console.log("Error connecting to DB...", err);
    process.exit(1);
  }
};
