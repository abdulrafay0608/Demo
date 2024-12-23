import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", AuthSchema);

export default AuthModel;
