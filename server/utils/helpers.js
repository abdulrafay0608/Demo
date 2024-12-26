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
  const token = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    user,
    token,
  });
};
