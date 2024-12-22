import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      //   trim: true,
      //   unique: true, // Enforces unique usernames
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      //   trim: true,
      unique: true, // Enforces unique emails
      //   lowercase: true, // Ensures email is stored in lowercase
      //   validate: {
      //     validator: function (v) {
      //       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
      //     },
      //     message: (props) => `${props.value} is not a valid email!`,
      //   },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //   minlength: [6, "Password must be at least 6 characters long"], // Ensures strong passwords
    },
    role: {
      type: String,
      //   enum: ["admin", "user", "manager"], // Restricts roles to specific values
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", AuthSchema);

export default AuthModel;
