import AuthModel from "../models/authModel.js";
import { generateToken, hashPassword } from "../utils/helpers.js";

export const SignUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isExist = await AuthModel.findOne({ email });

    if (isExist) {
      return res.status(201).send({
        success: false,
        message:
          "This email address is already registered. Please use a different email or try logging in.",
      });
    }
    const hashpass = await hashPassword(password);

    const user = await AuthModel.create({
      username,
      email,
      password: hashpass,
    });

    generateToken(user, 200, "Create Successful", res);
  } catch (error) {
    console.error(`Create Error: ${error}`);
    res.status(500).json({ success: false, message: error });
  }
};

export const SigInController = async (req, res) => {
  try {
  } catch (error) {}
};

export const LoginCheckController = async (req, res) => {
  try {
  } catch (error) {}
};

export const LogOutController = async (req, res) => {
  try {
  } catch (error) {}
};
