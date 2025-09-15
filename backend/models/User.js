import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer"], required: true },
    avatar: String,
    verificationToken: String,
    resume: String,
    // For company
    companyName: String,
    companyDescription: String,
    companyLogo: String,
  },
  { timestamps: true }
);
// Encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});
// Match entered password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
