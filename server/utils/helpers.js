import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
  } catch (error) {
    console.log(`Hash password error: ${error}`);
  }
};

export const comparePassword = async (password, hashPass) => {
  return bcrypt.compare(password, hashPass);
};

export const generateToken = (user, statusCode, message, res) => {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .json({ success: true, message, user, token });
};
