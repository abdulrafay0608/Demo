import AuthModel from "../models/authModel.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/helpers.js";

export const SignUpController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the email already exists
    const isExist = await AuthModel.findOne({ email });
    if (isExist) {
      return res.status(201).send({
        success: false,
        message:
          "This email address is already registered. Please use a different email or try logging in.",
      });
    }

    // Hash the password
    const hashpass = await hashPassword(password);

    // Create the user
    await AuthModel.create({
      username,
      email,
      password: hashpass,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error(`Sign-up Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const SigInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found. Please check and try again",
      });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password you entered is incorrect. Please try again",
      });
    }
    generateToken(user, 200, "Login successful", res);
  } catch (error) {
    console.error(`Login Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const LoginCheckController = async (req, res) => {
  try {
    const user = await AuthModel.findById(req?.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please log in again",
      });
    }
    res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      user,
    });
  } catch (error) {
    console.error(`Login Check Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const LogOutController = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(`Logged out Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const user = await AuthModel.find({ role: "user" });

    res.status(200).json({
      success: true,
      message: "Get successfully",
      user,
    });
  } catch (error) {
    console.error(`Get All User Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
