import mongoose from "mongoose";

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
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", AuthSchema);

export default AuthModel;
